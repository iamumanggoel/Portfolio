export interface AppTheme{
    name: ThemeType;
    icon: string;
}

export type ThemeType = Theme.Light | Theme.Dark | Theme.System;

export enum Theme {
    Light = 'light',
    Dark = 'dark',
    System = 'system'
}