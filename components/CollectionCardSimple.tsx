import { Image } from "expo-image";
import { AppView } from "./AppView";
import { VinylItem } from "@/store/slices/collectionSlice";

type CollectionCardSimpleProps = {
  coverImage: VinylItem["coverImage"];
};

export const CollectionCardSimple = ({
  coverImage,
}: CollectionCardSimpleProps) => {
  return (
    <AppView
      variant="transparent"
      className="w-[50%] aspect-square mb-5 rounded p-2"
    >
      <Image
        source={{ uri: coverImage }}
        style={{ width: "100%", height: "100%", borderRadius: 8 }}
      />
    </AppView>
  );
};
