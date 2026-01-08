// UI
import { AppView } from "@/components/AppView";
import { Scanner } from "@/components/Scanner";

export const Scan = () => {
  return (
    <AppView className="flex-1 bg-red-300">
      <Scanner />
    </AppView>
  );
};

export default Scan;
