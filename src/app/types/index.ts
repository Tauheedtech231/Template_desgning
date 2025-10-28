// types/index.ts
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}
export interface College {
  id: string;
  name: string;
  representativeName: string;
  logo: string;
  status: 'active' | 'inactive';
  theme: string;
   customTheme?: ThemeColors;
  modules: {
    about: boolean;
    faculty: boolean;
    events: boolean;
    gallery: boolean;
    achievements: boolean;
    contact?: boolean; // ✅ Added new "Contact" module
    [key: string]: boolean | undefined; // ✅ Supports additional dynamic modules
  };
  createdAt: Date;
  updatedAt: Date;
}


export interface Announcement {
  id: string;
  title: string;
  message: string;
  targetCollege: string; // 'all' or college id
  createdAt: Date;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  isCustom?: boolean;
}

export interface AppSettings {
  darkMode: boolean;
  accentColor: 'blue' | 'purple' | 'green';
}