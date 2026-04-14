import { Image } from "expo-image";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AppView } from "./AppView";
import { AppText } from "./AppText";
import { VinylItem } from "@/store/slices/collectionSlice";

type CollectionCardDetailedProps = {
  coverImage: VinylItem["coverImage"];
  artist: VinylItem["artist"];
  title: VinylItem["title"];
  handleDelete: () => void;
};

export const CollectionCardDetailed = ({
  coverImage,
  title,
  artist,
  handleDelete,
}: CollectionCardDetailedProps) => {
  return (
    <AppView
      variant="bgCard"
      className="w-full mb-4 rounded-xl border border-gray-200 p-3"
    >
      <Image
        source={{ uri: coverImage }}
        style={{ width: "100%", aspectRatio: 1, borderRadius: 8 }}
      />
      <AppView className="pt-3">
        <AppText className="text-base font-semibold">{title}</AppText>
        <AppText variant="muted" className="mt-1">
          {artist}
        </AppText>
        <AppView className="pt-2 flex-row justify-end">
          <Pressable
            onPress={handleDelete}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Delete record from collection"
          >
            <MaterialIcons name="delete-outline" size={24} color="#D14343" />
          </Pressable>
        </AppView>
      </AppView>
    </AppView>
  );
};
