// 3rd party
import { FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// UI
import { AppView } from "@/components/AppView";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { CollectionCardSimple } from "@/components/CollectionCardSimple";
import { CollectionCardDetailed } from "@/components/CollectionCardDetailed";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeVinyl, selectAllVinyl } from "@/store/slices/collectionSlice";
import { useState } from "react";

export enum ViewMode {
  Simple = "simple",
  Detailed = "detailed",
}

export const Collection = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const allVinyl = useAppSelector(selectAllVinyl);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Simple);

  const isSimpleViewMode = viewMode === ViewMode.Simple;
  const hasCollectionItems = allVinyl.length > 0;

  const handleViewMode = (mode: ViewMode) => {
    if (viewMode === mode) return;
    setViewMode(mode);
  };

  const handleDelete = (id: string) => {
    dispatch(removeVinyl(id));
  };

  return (
    <AppView variant="bgScreen" className="flex-1">
      <AppText className="pt-4 px-4 flex-row">My collection</AppText>

      {!hasCollectionItems ? (
        <AppView
          variant="bgSection"
          className="mx-4 mt-4 rounded-xl border border-gray-200 p-6"
        >
          <AppText className="text-lg font-semibold text-center">
            Your collection is empty
          </AppText>
          <AppText variant="muted" className="text-center mt-2">
            Scan your first record to start building your collection.
          </AppText>
          <Button
            className="mt-6"
            onPress={() => router.push("/(tabs)")}
            title="Go to scan"
          />
        </AppView>
      ) : (
        <>
          <AppView
            variant="transparent"
            className="flex-row justify-end px-4 pb-2 items-center"
          >
            <TouchableOpacity
              onPress={() => handleViewMode(ViewMode.Simple)}
              className="mr-3"
            >
              <MaterialIcons
                name="grid-view"
                size={28}
                color={isSimpleViewMode ? "#007AFF" : "#666"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleViewMode(ViewMode.Detailed)}>
              <MaterialIcons
                name="view-list"
                size={36}
                color={!isSimpleViewMode ? "#007AFF" : "#666"}
              />
            </TouchableOpacity>
          </AppView>

          <FlatList
            key={viewMode}
            data={allVinyl}
            keyExtractor={(record) => record.id}
            numColumns={isSimpleViewMode ? 2 : 1}
            columnWrapperStyle={
              isSimpleViewMode ? { justifyContent: "space-around" } : undefined
            }
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item: record }) => {
              return isSimpleViewMode ? (
                <CollectionCardSimple
                  coverImage={record.coverImage}
                  handleDelete={() => handleDelete(record.id)}
                />
              ) : (
                <CollectionCardDetailed
                  coverImage={record.coverImage}
                  title={record.title}
                  artist={record.artist}
                  handleDelete={() => handleDelete(record.id)}
                />
              );
            }}
          />
        </>
      )}
    </AppView>
  );
};

export default Collection;
