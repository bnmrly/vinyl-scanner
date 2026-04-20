import AsyncStorage from "@react-native-async-storage/async-storage";
import type { VinylItem } from "./slices/collectionSlice";

const COLLECTION_STORAGE_KEY = "vinylScannerCollection";

const toVinylItem = (value: unknown): VinylItem | null => {
  if (typeof value !== "object" || value === null) return null;

  const vinyl = value as Record<string, unknown>;

  if (
    typeof vinyl.id !== "string" ||
    typeof vinyl.title !== "string" ||
    typeof vinyl.coverImage !== "string"
  ) {
    return null;
  }

  const trimmedTitle = vinyl.title.trim();

  const explicitArtist =
    typeof vinyl.artist === "string" && vinyl.artist.trim().length > 0
      ? vinyl.artist.trim()
      : null;

  const hasRealExplicitArtist =
    explicitArtist !== null &&
    explicitArtist.toLowerCase() !== "unknown artist";

  return {
    id: vinyl.id,
    artist: hasRealExplicitArtist ? explicitArtist : "Unknown artist",
    title: trimmedTitle,
    coverImage: vinyl.coverImage,
  };
};

export const loadPersistedCollection = async (): Promise<VinylItem[]> => {
  try {
    const storedCollectionJson = await AsyncStorage.getItem(
      COLLECTION_STORAGE_KEY,
    );
    if (!storedCollectionJson) return [];

    const parsed: unknown = JSON.parse(storedCollectionJson);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((entry) => toVinylItem(entry))
      .filter((entry): entry is VinylItem => entry !== null);
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

    const vinylItems = parsed
      .map((entry) => toVinylItem(entry))
      .filter((entry): entry is VinylItem => entry !== null);
    console.log("Stored vinylScannerCollection:", vinylItems);
  } catch (error) {
    console.warn("Failed to read Stored vinylScannerCollection", error);
  }
};
