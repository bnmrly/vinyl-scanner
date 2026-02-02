// 3rd party
import { Image } from "expo-image";

// Hooks and utilities
import { twMerge } from "@/utilities/utilities";
import { useThemeColor } from "@/hooks/useThemeColor";

// Theme

// UI
import { AppView } from "./AppView";
import { AppText } from "./AppText";

// Types
import type { ClassNameValue } from "tailwind-merge";

type CardProps = {
  url: string;
  cardWrapperClassName?: ClassNameValue;
  title: string;
  titleWrapperClassName?: ClassNameValue;
};

const baseCardClassName = "";

const baseTextClassName = "";

export const Card = ({
  url,
  title,
  cardWrapperClassName,
  titleWrapperClassName,
}: CardProps) => {
  const shadowColor = useThemeColor({}, "shadow");

  return (
    <AppView variant="bgCard" className={twMerge([baseCardClassName, cardWrapperClassName, "items-center"])}>
      <AppView
        variant="transparent"
        className="w-[300px] h-[300px] mb-5 rounded"
        style={{
          // iOS shadow
          shadowColor: shadowColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          // Android shadow
          elevation: 8,
        }}
      >
        <Image
          source={{ uri: url }}
          style={{ width: "100%", height: "100%", borderRadius: 8 }}
        />
      </AppView>
      <AppView className="items-center w-full">
        <AppText variant="brand" className="">{title}</AppText>
      </AppView>
    </AppView>
  );
};
