// 3rd party
import { Image } from "expo-image";

// Hooks and utilities
import { twMerge } from "@/utilities/utilities";

// Design system
import { colors } from "@/designSystem/tokens/colors";

// UI
import { View } from "@/components/Themed";
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
    <View className={twMerge([baseCardClassName, cardWrapperClassName])}>
      <Image
        source={{ uri: url }}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <View className="">
        <AppText lightColor={colors.light.textBrand} darkColor={colors.dark.textBrand} className="font-thin">{title}</AppText>
      </View>
    </View>
  );
};
