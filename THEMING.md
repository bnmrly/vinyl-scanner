# Theming Guide

## Overview

Hook-based theming with semantic color roles in `Theme` object, `useThemeColor` hook, and automatic theme switching.

## Core System

### Theme Structure

`designSystem/theme/appTheme.ts` defines flat color roles for light and dark:

```typescript
export const Theme = {
  light: {
    bgScreen: colors.white.offWhite,
    textContent: colors.black.blackBlue,
    tint: colors.orange[300],
    border: colors.grey["200"],
  },
  dark: {
    bgScreen: colors.black.blackBlue,
    textContent: colors.grey["100"],
    tint: colors.red[200],
    border: colors.grey["700"],
  },
}
```

### useThemeColor Hook

Get theme-aware colors:

```typescript
const backgroundColor = useThemeColor({}, 'bgCard');
```

### Component Usage

Use semantic variants:

```typescript
<AppText variant="body">      // textContent role
<AppView variant="bgCard">    // bgCard role
<Button variant="primary">    // tint role
```

## Building Components

### Use Semantic Variants

```typescript
export const MyCard = ({ title, content }) => (
  <AppView variant="bgCard" className="p-4 rounded-lg">
    <AppText variant="brand">{title}</AppText>
    <AppText variant="body">{content}</AppText>
  </AppView>
);
```

### Use Hook Directly

```typescript
const CustomComponent = () => {
  const bgColor = useThemeColor({}, 'bgSection');
  return <View style={{ backgroundColor: bgColor }}>...</View>;
};
```

### Override Colors

```typescript
const bgColor = useThemeColor({ light: '#fff', dark: '#1a1a1a' }, 'bgCard');
```

### Tailwind: Layout Only

Use Tailwind for spacing/layout, hook for colors:

```typescript
// Good
<AppView variant="bgCard" className="p-4 rounded-xl">

// Bad - colors won't switch themes
<View className="bg-grey-100">
```

## Adding Color Roles

Add to both light and dark in `appTheme.ts`:

```typescript
export const Theme = {
  light: { successBg: colors.green["100"] },
  dark: { successBg: colors.green["900"] },
}
```

Then use:

```typescript
const bgColor = useThemeColor({}, 'successBg');
```

## Tailwind vs Hook

**Tailwind for:** Layout, spacing, sizing, borders, shadows, positioning

**Hook for:** Background colors, text colors, border colors, any color that switches with theme

## Troubleshooting

**Colors not switching**: Use `useThemeColor` hook, not Tailwind color classes

**Wrong color**: Check correct `ColorRole` is passed

**Need override**: Use `<AppView lightColor="#fff" darkColor="#000">`

**TypeScript error**: Add role to both light and dark in `Theme` object
