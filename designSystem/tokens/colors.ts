import colours from './colors.json';

export const colors: typeof colours = colours;

export type ColorKey = keyof typeof colours;
