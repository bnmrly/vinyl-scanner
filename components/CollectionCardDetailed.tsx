import { Image } from "expo-image";
import { AppView } from "./AppView";
import { AppText } from "./AppText";

type CollectionCardDetailedProps = {
  coverImage: string;
};

export const CollectionCardDetailed = ({
  coverImage,
}: CollectionCardDetailedProps) => {
  return (
    <AppView
      variant="transparent"
      className="w-[50%] aspect-square mb-5 rounded p-2"
    >
      <AppText>DETAILED!!!!!!</AppText>
      <Image
        source={{ uri: coverImage }}
        style={{ width: "100%", height: "100%", borderRadius: 8 }}
      />
    </AppView>
  );
};
