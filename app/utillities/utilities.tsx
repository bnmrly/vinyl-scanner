import { ClassNameValue, twMerge as twm } from "tailwind-merge";

export const tw = <T extends Record<string, string | object>>(value: T) =>
  value;

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export const twMerge = (props: ClassNameValue) => twm(props);
