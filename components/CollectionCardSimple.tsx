import { Image } from "expo-image";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AppView } from "./AppView";
import { VinylItem } from "@/store/slices/collectionSlice";

type CollectionCardSimpleProps = {
  coverImage: VinylItem["coverImage"];
  handleDelete: () => void;
};

export const CollectionCardSimple = ({
  coverImage,
  handleDelete,
}: CollectionCardSimpleProps) => {
  return (
    <AppView
      variant="bgCard"
      className="w-[48%] mb-5 rounded-xl border border-gray-200 p-3"
    >
      <AppView className="w-full aspect-square">
        <Image
          source={{ uri: coverImage }}
          style={{ width: "100%", height: "100%", borderRadius: 8 }}
        />
      </AppView>
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
  );
};
