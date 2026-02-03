// 3rd party
import { CameraView } from "expo-camera";

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
    handleBarCodeScanned,
    handleResetScan,
  } = useScanBarcode();

  const recordInCollection = useAppSelector((state) =>
    scannedData ? selectVinylById(state, scannedData.id.toString()) : undefined,
  );
  // const isAlreadyInCollection = !!existingVinyl;

  const handleSave = () => {
    if (scannedData && !recordInCollection) {
      dispatch(
        addVinyl({
          id: scannedData.id.toString(),
          title: scannedData.title,
          coverImage: scannedData.cover_image,
        }),
      );
      handleResetScan();
    }
  };

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <AppView
        variant="bgCard"
        className="flex-1 justify-center items-center px-4"
      >
        <AppText className="text-center pb-2">
          We need your permission to use the camera
        </AppText>
        {/* <Button onPress={requestPermission} title="Grant permission" /> */}
      </AppView>
    );
  }

  return (
    <AppView variant="bgCard" className="flex-1">
      {!scannedData && (
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

      {/* TODO: Create themed button */}

      {scannedData && (
        <AppView
          variant="bgCard"
          className="flex-1 items-center border border-red-500"
        >
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
