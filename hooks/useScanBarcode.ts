import { useCameraPermissions } from "expo-camera";
import { useCallback, useState } from "react";

type BarCodeData = {
  data: string;
  type: string;
};

// TODO: LINK USER TO SETTINGS FOR SAD PATH

export const useScanBarcode = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleBarCodeScanned = useCallback(
    async ({ data, type }: BarCodeData) => {
      setScanned(true);

      try {
        if (data) {
          const discogsRequestUrl = `https://api.discogs.com/database/search?barcode=${data}&token=${process.env.EXPO_PUBLIC_DISCOGS_ACCESS_TOKEN}`;

          const response = await fetch(discogsRequestUrl);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log("Discogs search result:", responseData);

          setScannedData(data);
        }
      } catch (err) {
        console.log("err", err);
      }

      console.log("barcode scanned, data and type is:", data, type);
    },
    []
  );

  console.log("🚀 --- HOOK --- scannedData IN HOOK:", scannedData);

  return {
    permission,
    requestPermission,
    scanned,
    scannedData,
    handleBarCodeScanned,
  };
};
