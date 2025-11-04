import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";

export default function Scanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  console.log("🚀 --- Scanner --- scannedData:", scannedData);

  if (!permission) {
    // Camera permissions are still loading.
    // TODO: ADD LOADING STATE HERE
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 justify-center bg-black px-4">
        <Text className="text-center pb-2 text-white">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleBarCodeScanned = ({
    data,
    type,
  }: {
    data: string;
    type: string;
  }) => {
    setScanned(true);
    setScannedData(data);
    Alert.alert("Barcode Scanned", `Type: ${type}\nData: ${data}`, [
      {
        text: "OK",
        onPress: () => setScanned(false), // allow scanning again
      },
    ]);
  };

  return (
    <View className="flex-1 justify-center bg-black relative border border-purple-500">
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        className="border-4 border-red-500"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <View className="absolute bottom-16 flex-row w-full px-16 bg-transparent">
        <TouchableOpacity
          className="flex-1 items-center"
          onPress={toggleCameraFacing}
        >
          <Text className="text-white font-bold text-2xl">
            scanner!!! Flip Camera
          </Text>
        </TouchableOpacity>
      </View>

      {scannedData && (
        <View className="absolute top-10 self-center bg-black bg-opacity-60 p-2 rounded-md">
          <Text className="text-white text-base">
            Scanned Data: {scannedData}
          </Text>
        </View>
      )}
    </View>
  );
}
