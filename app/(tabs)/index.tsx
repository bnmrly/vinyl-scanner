// UI
import { AppText } from "@/components/AppText";
import { AppView } from "@/components/AppView";
import { Scanner } from "@/components/Scanner";

export const Scan = () => {
  return (
    <AppView variant="bgScreen" className="flex-1">
      <AppView variant="bgSection" className="p-4 flex-1"> 
        <Scanner />             
      </AppView>
    
    </AppView>
  );
};

export default Scan;
