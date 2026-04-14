import AsyncStorage from "@react-native-async-storage/async-storage";
import type { VinylItem } from "./slices/collectionSlice";

const COLLECTION_STORAGE_KEY = "vinylScannerCollection";

const isVinylItem = (value: unknown): value is VinylItem => {
  if (typeof value !== "object" || value === null) return false;
  const vinyl = value as Record<string, unknown>;
  return (
    typeof vinyl.id === "string" &&
    typeof vinyl.title === "string" &&
    typeof vinyl.coverImage === "string"
  );
};

export const loadPersistedCollection = async (): Promise<VinylItem[]> => {
  try {
    const storedCollectionJson = await AsyncStorage.getItem(
      COLLECTION_STORAGE_KEY,
    );
    if (!storedCollectionJson) return [];

    const parsed: unknown = JSON.parse(storedCollectionJson);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isVinylItem);
  } catch {
    return [];
  }
};

export const persistCollection = async (items: VinylItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    if (__DEV__) {
      console.warn("Failed to persist collection", error);
    }
  }
};

export const logLocalStorageCollection = async (): Promise<void> => {
  try {
    const storedCollectionJson = await AsyncStorage.getItem(
      COLLECTION_STORAGE_KEY,
    );

    if (!storedCollectionJson) {
      console.log("Stored vinylScannerCollection is empty.");
      return;
    }

    const parsed: unknown = JSON.parse(storedCollectionJson);
    if (!Array.isArray(parsed)) {
      console.log(
        "vinylScannerCollection exists but is not an array:",
        storedCollectionJson,
      );
      return;
    }

    const vinylItems = parsed.filter(isVinylItem);
    console.log("Stored vinylScannerCollection:", vinylItems);
  } catch (error) {
    console.warn("Failed to read Stored vinylScannerCollection", error);
  }
};
