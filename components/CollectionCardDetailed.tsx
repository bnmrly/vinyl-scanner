import { Image } from "expo-image";
import { AppView } from "./AppView";
import { AppText } from "./AppText";
import { VinylItem } from "@/store/slices/collectionSlice";

type CollectionCardDetailedProps = {
  coverImage: VinylItem["coverImage"];
  artist: VinylItem["artist"];
  title: VinylItem["title"];
};

export const CollectionCardDetailed = ({
  coverImage,
  title,
  artist,
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
      </AppView>
    </AppView>
  );
};
