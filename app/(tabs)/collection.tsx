// 3rd party
import { FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// UI
import { AppView } from "@/components/AppView";
import { AppText } from "@/components/AppText";
import { CollectionCardSimple } from "@/components/CollectionCardSimple";
import { CollectionCardDetailed } from "@/components/CollectionCardDetailed";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeVinyl, selectAllVinyl } from "@/store/slices/collectionSlice";
import { logLocalStorageCollection } from "@/store/persistence";
import { useEffect, useState } from "react";

export enum ViewMode {
  Simple = "simple",
  Detailed = "detailed",
}

export const Collection = () => {
  const dispatch = useAppDispatch();
  const allVinyl = useAppSelector(selectAllVinyl);

  console.log("🚀 --- Collection --- allVinyl:", allVinyl);

  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Simple);

  useEffect(() => {
    if (!__DEV__) return;

    const logCollection = async () => {
      await logLocalStorageCollection();
    };

    logCollection();
  }, []);

  const isSimpleViewMode = viewMode === ViewMode.Simple;

  const handleViewMode = (mode: ViewMode) => {
    if (viewMode === mode) return;
    setViewMode(mode);
  };

  const handleDelete = (id: string) => {
    dispatch(removeVinyl(id));
  };

  return (
    <AppView variant="bgScreen" className="flex-1">
      <AppText className="pt-4 px-4 flex-row">Toggle collection view</AppText>

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
          console.log("🚀 _ record:", record);
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
    </AppView>
  );
};

export default Collection;
