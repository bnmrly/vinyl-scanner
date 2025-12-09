import { twMerge } from "@/app/utillities/utilities";

import { Image } from "expo-image";

import { Text, View } from "@/components/Themed";

import type { ClassNameValue } from "tailwind-merge";

type CardProps = {
  url: string;
  cardWrapperClassName?: ClassNameValue;
  title: string;
  titleWrapperClassName?: ClassNameValue;
};

const baseCardClassName = "border-8 border-blue-500";

// const baseTextClassName = "text-red-500";

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
        <Text className={twMerge([baseTextClassName, titleWrapperClassName])}>
          {title}
        </Text>
      </View>
    </View>
  );
};
