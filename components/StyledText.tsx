import { Text, TextProps } from "./Themed";

// TODO: BEING USED???

export const MonoText = (props: TextProps) => {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
};
