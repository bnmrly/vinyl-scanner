// 3rd party
import { CameraView } from "expo-camera";




// Hooks and utilities
import { useScanBarcode } from "@/hooks/useScanBarcode";

//UI
import { AppView } from "./AppView";
import { AppText } from "./AppText";
import { Card } from "./Card";
import { Button } from "./Button";


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
      <AppView variant="bgSection" className="flex-1 justify-center items-center px-4">
        <AppText className="text-center pb-2">We need your permission to use the camera</AppText>
        {/* <Button onPress={requestPermission} title="Grant permission" /> */}
      </AppView>
    );
  }

  return (
    <AppView variant="bgScreen" className="flex-1">
      {/* NOT SCANNED → SHOW CAMERA */}
      {!scannedData && (
        <AppView className="flex-1">
          <CameraView
            style={{ flex: 1 }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />

          <AppView variant="bgCard" className="border-4">
            <AppText className="text-lg px-4 py-2">SCAN SOMETHING...</AppText>
          </AppView>
        </AppView>
      )}

      {/* TODO: Create themed button */}
  
      {scannedData && (
        <AppView variant="bgSection" className="flex-1 justify-center items-center">
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
