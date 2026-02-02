// 3rd party
import { Image } from "expo-image";

// Hooks and utilities
import { twMerge } from "@/utilities/utilities";

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

  return (
    <AppView variant="bgCard" className={twMerge([baseCardClassName, cardWrapperClassName])}>
      <Image
        source={{ uri: url }}
        style={{ width: 300, height: 300, marginBottom: 20 }}
      />
      <AppView className="">
        <AppText variant="brand" className="">{title}</AppText>
      </AppView>
    </AppView>
  );
};
