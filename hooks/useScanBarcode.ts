import { useCameraPermissions } from "expo-camera";
import { useCallback, useState } from "react";

type BarCodeData = {
  data: string;
  type: string;
};

export type DiscogsResult = {
  id: number;
  title: string;
  cover_image: string;
  // Add other fields as needed from Discogs API
};

// TODO: LINK USER TO SETTINGS FOR SAD PATH

// TODO: Currently setting scanned data to be just the first result in the array for ease

export const useScanBarcode = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<DiscogsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanErrorMessage, setScanErrorMessage] = useState<string | null>(null);
  const [hasNoResults, setHasNoResults] = useState(false);

  const handleBarCodeScanned = useCallback(
    async ({ data, type }: BarCodeData) => {
      setScanned(true);
      setIsLoading(true);
      setScanErrorMessage(null);
      setHasNoResults(false);
      setScannedData(null);

      try {
        if (!data) {
          setScanErrorMessage("No barcode data detected. Please try again.");
          return;
        }

        const discogsRequestUrl = `https://api.discogs.com/database/search?barcode=${data}&token=${process.env.EXPO_PUBLIC_DISCOGS_ACCESS_TOKEN}`;

        const response = await fetch(discogsRequestUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const firstResult = responseData.results?.[0] ?? null;

        if (!firstResult) {
          setHasNoResults(true);
          return;
        }

        setScannedData(firstResult);
      } catch (err) {
        console.log("err", err);
        setScanErrorMessage("Could not fetch record data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const handleResetScan = useCallback(() => {
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
