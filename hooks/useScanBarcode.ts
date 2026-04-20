import { useCameraPermissions } from "expo-camera";
import { useCallback, useState } from "react";

type BarCodeData = {
  data: string;
};

export type DiscogsResult = {
  id: number;
  artist: string;
  title: string;
  cover_image: string;
  resource_url?: string;
};

type DiscogsReleaseDetails = {
  id: number;
  title: string;
  artists_sort?: string;
  artists?: { name?: string }[];
  images?: { uri?: string }[];
  thumb?: string;
  resource_url?: string;
};

const getDiscogsArtist = (release: DiscogsReleaseDetails): string => {
  const artistSort = release.artists_sort?.trim();
  if (artistSort) return artistSort;

  const firstArtist = release.artists?.[0]?.name?.trim();
  if (firstArtist) return firstArtist;

  return "Unknown Artist";
};

// TODO: MVP simplification - no caching or rate-limit retries yet.
// Add caching + 429 handling if scan volume grows or we hit Discogs limits.

// TODO: Currently setting scanned data to be just the first result in the array for ease

export const useScanBarcode = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<DiscogsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanErrorMessage, setScanErrorMessage] = useState<string | null>(null);
  const [hasNoResults, setHasNoResults] = useState(false);

  const handleBarCodeScanned = useCallback(
    async ({ data }: BarCodeData) => {
      const barcodeData = data?.trim();
      // Some camera callbacks can fire without a usable payload first; ignore these.
      if (!barcodeData) return;

      // Start a fresh scan cycle and clear any previous result/error UI state.
      setScanned(true);
      setIsLoading(true);
      setScanErrorMessage(null);
      setHasNoResults(false);
      setScannedData(null);

      try {
        const discogsToken = process.env.EXPO_PUBLIC_DISCOGS_ACCESS_TOKEN;
        if (!discogsToken) {
          setScanErrorMessage("Discogs token is missing. Please check your env.");
          return;
        }

        // 1) Search Discogs by barcode and use the first matching release.
        const discogsRequestUrl = `https://api.discogs.com/database/search?barcode=${barcodeData}&token=${discogsToken}`;
        const searchResponse = await fetch(discogsRequestUrl);
        if (!searchResponse.ok) {
          throw new Error(`HTTP error! status: ${searchResponse.status}`);
        }
        const responseData = (await searchResponse.json()) as {
          results?: Array<{
            id: number;
            title: string;
            cover_image: string;
            resource_url?: string;
          }>;
        };

        const firstResult = responseData.results?.[0] ?? null;

        if (!firstResult) {
          setHasNoResults(true);
          return;
        }

        if (__DEV__) {
          console.log("**** firstResult:", firstResult);
        }

        if (!firstResult.resource_url) {
          throw new Error("Missing release details URL in Discogs search result.");
        }

        const releaseUrl = new URL(firstResult.resource_url);
        releaseUrl.searchParams.set("token", discogsToken);

        // 2) Fetch release details for cleaner structured data (artist/title/image).
        const releaseResponse = await fetch(releaseUrl.toString());
        if (!releaseResponse.ok) {
          throw new Error(`HTTP error! status: ${releaseResponse.status}`);
        }
        const releaseDetails =
          (await releaseResponse.json()) as DiscogsReleaseDetails;
        if (__DEV__) {
          console.log("**** discogs releaseDetails:", releaseDetails);
        }
        setScannedData({
          id: releaseDetails.id,
          artist: getDiscogsArtist(releaseDetails),
          title: releaseDetails.title,
          cover_image:
            releaseDetails.images?.[0]?.uri ??
            releaseDetails.thumb ??
            firstResult.cover_image,
          resource_url: releaseDetails.resource_url ?? firstResult.resource_url,
        });
      } catch (err) {
        if (__DEV__) {
          console.log("err", err);
        }

        setScanErrorMessage("Could not fetch record data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const handleResetScan = useCallback(() => {
    // Return scanner UI to initial state so user can scan again.
    setScanned(false);
    setScannedData(null);
    setIsLoading(false);
    setScanErrorMessage(null);
    setHasNoResults(false);
  }, []);

  return {
    permission,
    requestPermission,
    scanned,
    scannedData,
    isLoading,
    scanErrorMessage,
    hasNoResults,
    handleBarCodeScanned,
    handleResetScan,
  };
};
