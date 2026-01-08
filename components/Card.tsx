// 3rd party
import { Image } from "expo-image";

// Hooks and utilities
import { twMerge } from "@/utilities/utilities";

// Theme
import { Theme } from '@/designSystem/theme/appTheme';

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

const baseCardClassName = "border-8 border-blue-500";

const baseTextClassName = "";

export const Card = ({
  url,
  title,
  cardWrapperClassName,
  titleWrapperClassName,
}: CardProps) => {

  return (
    <AppView className={twMerge([baseCardClassName, cardWrapperClassName])}>
      <Image
        source={{ uri: url }}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <AppView className="">
        <AppText lightColor={Theme.light.textBrand} darkColor={Theme.dark.textBrand} className="">{title}</AppText>
      </AppView>
    </AppView>
  );
};
