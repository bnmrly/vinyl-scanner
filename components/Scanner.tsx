// 3rd party
import { CameraView } from "expo-camera";
import { Button, View } from "react-native";

// Hooks and utilities
import { useScanBarcode } from "@/hooks/useScanBarcode";

//UI
import { AppView } from "./AppView";
import { AppText } from "./AppText";
import { Card } from "./Card";


export const Scanner = () => {
  const {
    permission,
    requestPermission,
    scanned,
    scannedData,
    handleBarCodeScanned,
    handleResetScan,
  } = useScanBarcode();
  console.log("🚀 --- Scanner --- scannedData:", scannedData);

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <AppView> className="flex-1 justify-center items-center bg-yellow-500 px-4">
        <AppText className="text-center pb-2 text-black">
          We need your permission to use the camera
        </AppText>
        {/* <Button onPress={requestPermission} title="Grant permission" /> */}
      </AppView>
    );
  }

  return (
    <AppView className="flex-1 bg-green-500">
      {/* NOT SCANNED → SHOW CAMERA */}
      {!scannedData && (
        <AppView className="flex-1 bg-blue-500">
          <CameraView
            style={{ flex: 1 }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />

          <AppView className="border-4 border-red-500">
            <AppText className="text-lg px-4 py-2">SCAN SOMETHING...</AppText>
          </AppView>
        </AppView>
      )}

      {/* TODO: Create themed button */}
  
      {scannedData && (
        <AppView className="flex-1 bg-orange-500 justify-center items-center">
          <Card
            url={scannedData?.cover_image}
            title={scannedData?.title}
            cardWrapperClassName="border-yellow-500"
            titleWrapperClassName="text-blue-500"
          />
          <Button onPress={handleResetScan} title="Scan reset" />
        </AppView>
      )}
    </AppView>
  );
};
