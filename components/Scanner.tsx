// 3rd party
import { CameraView } from "expo-camera";
import { ActivityIndicator, Linking } from "react-native";

// Hooks and utilities
import { useScanBarcode } from "@/hooks/useScanBarcode";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addVinyl, selectVinylById } from "@/store/slices/collectionSlice";

//UI
import { AppView } from "./AppView";
import { AppText } from "./AppText";
import { Card } from "./Card";
import { Button } from "./Button";

export const Scanner = () => {
  const dispatch = useAppDispatch();
  const {
    permission,
    requestPermission,
    scanned,
    scannedData,
    isLoading,
    scanErrorMessage,
    hasNoResults,
    handleBarCodeScanned,
    handleResetScan,
  } = useScanBarcode();

  const recordInCollection = useAppSelector((state) =>
    scannedData ? selectVinylById(state, scannedData.id.toString()) : undefined,
  );

  const handleSave = () => {
    if (scannedData && !recordInCollection) {
      dispatch(
        addVinyl({
          id: scannedData.id.toString(),
          artist: scannedData.artist,
          title: scannedData.title,
          coverImage: scannedData.cover_image,
        }),
      );
      handleResetScan();
    }
  };

  if (!permission) return null;

  if (!permission.granted) {
    const canAskAgain = permission.canAskAgain;

    const handleOpenSettings = () => Linking.openSettings();

    return (
      <AppView
        variant="bgCard"
        className="flex-1 justify-center items-center px-4"
      >
        <AppText className="text-center pb-2 text-lg font-semibold">
          Camera access required
        </AppText>
        <AppText variant="muted" className="text-center">
          {canAskAgain
            ? "Allow camera access to scan vinyl barcodes."
            : "Camera access is blocked. Enable it in Settings to continue scanning."}
        </AppText>
        {canAskAgain ? (
          <Button className="mt-6" onPress={requestPermission} title="Grant permission" />
        ) : (
          <Button className="mt-6" onPress={handleOpenSettings} title="Open settings" />
        )}
      </AppView>
    );
  }

  return (
    <AppView variant="bgCard" className="flex-1">
      {!scanned && (
        <AppView variant="bgSection" className="flex-1">
          <AppView variant="bgCard" className="items-center flex-1 pt-4">
            <AppText className="text-md mt-1 mb-8">
              Focus barcode within frame
            </AppText>
            <CameraView
              style={{ height: "25%", width: "70%", borderRadius: 15 }}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
          </AppView>
        </AppView>
      )}

      {scanned && isLoading && (
        <AppView
          variant="bgCard"
          className="flex-1 items-center justify-center px-4"
        >
          <ActivityIndicator size="large" />
          <AppText className="mt-4 text-center">
            Looking up record details...
          </AppText>
        </AppView>
      )}

      {scanned && !isLoading && scanErrorMessage && (
        <AppView
          variant="bgCard"
          className="flex-1 items-center justify-center px-4"
        >
          <AppText variant="error" className="text-center">
            {scanErrorMessage}
          </AppText>
          <Button
            className="mt-6"
            onPress={handleResetScan}
            title="Try another scan"
          />
        </AppView>
      )}

      {scanned && !isLoading && hasNoResults && (
        <AppView
          variant="bgCard"
          className="flex-1 items-center justify-center px-4"
        >
          <AppText className="text-center">
            No matching record found for that barcode.
          </AppText>
          <Button
            className="mt-6"
            onPress={handleResetScan}
            title="Scan again"
          />
        </AppView>
      )}

      {scanned && !isLoading && scannedData && (
        <AppView variant="bgCard" className="flex-1 items-center">
          <Card
            url={scannedData?.cover_image}
            title={scannedData?.title}
            cardWrapperClassName="p-4"
            titleWrapperClassName=""
          />

          <AppView className="mt-4">
            <Button
              onPress={handleSave}
              title="Save to collection"
              disabled={!!recordInCollection}
            />
            {recordInCollection && (
              <AppText variant="error" className="mt-1 text-center px-4">
                Item is already in collection
              </AppText>
            )}
            <Button
              variant="secondary"
              className="mt-8"
              onPress={handleResetScan}
              title="Scan again"
            />
          </AppView>
        </AppView>
      )}
    </AppView>
  );
};
