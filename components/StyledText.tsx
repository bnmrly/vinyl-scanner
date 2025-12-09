import { Text, TextProps } from "./Themed";

// TODO: BEING USED???

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}
