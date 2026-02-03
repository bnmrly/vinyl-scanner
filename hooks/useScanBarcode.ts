import { useCameraPermissions } from "expo-camera";
import { useCallback, useState } from "react";

type BarCodeData = {
  data: string;
  type: string;
};

// TODO: LINK USER TO SETTINGS FOR SAD PATH

// TODO: Currently settimg scanned data to be just the first result in the array  for ease

export const useScanBarcode = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<any | null>(null); // TODO: FIX ANY TYPE

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
          const firstResult = responseData.results?.[0] ?? null;

          setScannedData(firstResult);
        }
      } catch (err) {
        console.log("err", err);
      }

      // console.log("barcode scanned, data and type is:", data, type);
    },
    [],
  );

  const handleResetScan = useCallback(() => {
    setScanned(false);
    setScannedData(null);
  }, []);

  return {
    permission,
    requestPermission,
    scanned,
    scannedData,
    handleBarCodeScanned,
    handleResetScan,
  };
};
