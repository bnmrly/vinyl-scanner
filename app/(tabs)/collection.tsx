// 3rd party
import { Image } from "expo-image";

// UI
import { AppView } from "@/components/AppView";
import { AppText } from "@/components/AppText";
import { useAppSelector } from "@/store/hooks";
import { selectAllVinyl } from "@/store/slices/collectionSlice";

// TODO: ASYNC STORAGE

export const Collection = () => {
  const allVinyl = useAppSelector(selectAllVinyl);

  console.log("🚀 --- Collection --- allVinyl:", allVinyl);

  return (
    <AppView variant="bgScreen" className="flex-1">
      <AppText className="p-4">View collection here</AppText>
      {allVinyl?.length && (
        <AppView
          variant="bgSection"
          className="p-4 flex-1 flex-row justify-center flex-wrap"
        >
          {allVinyl.map((record) => {
            console.log("🚀 _ record:", record);
            return (
              <AppView
                key={record.id}
                variant="transparent"
                className="w-[160px] h-[160px] mb-5 rounded p-2"
              >
                {/* <AppText>{record.title}</AppText> */}
                <Image
                  source={{ uri: record.coverImage }}
                  style={{ width: "100%", height: "100%", borderRadius: 8 }}
                />
              </AppView>
            );
          })}
        </AppView>
      )}
    </AppView>
  );
};

export default Collection;
