import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


const defaultThemeSettings = {
  "data-bs-theme": "light",
  "data-sidebar": "light",
  "data-color": "primary",
  "data-topbar": "white",
  "data-layout": "default",
  "data-size": "default",
  "data-width": "fluid",
  "data-sidebarbg": "none",
  "dir": "ltr",
};


export type ThemeSettings = typeof defaultThemeSettings;

function loadTheme(): ThemeSettings {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem('themeSettings') || 'null');
    const result = {...defaultThemeSettings};
    if (stored && typeof stored === 'object') {
      for (const key of Object.keys(result) as (keyof ThemeSettings)[]) {
        const value = (stored as Record<string, unknown>)[key];
        if (typeof value === 'string') result[key] = value;
      }
    }
    return result;
  } catch { return {...defaultThemeSettings}; }
}
const initialState: {themeSettings: ThemeSettings} = {themeSettings: loadTheme()};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, { payload }: PayloadAction<Partial<ThemeSettings>>) => {
      if (payload.dir === "rtl") {
        state.themeSettings = { ...defaultThemeSettings, dir: "rtl" };
      } else if (state.themeSettings.dir === "rtl" && payload.dir !== "rtl") {
        state.themeSettings = { ...defaultThemeSettings, ...payload, dir: "ltr" };
      } else {
        state.themeSettings = { ...state.themeSettings, ...payload };
      }


      localStorage.setItem(
        "themeSettings",
        JSON.stringify(state.themeSettings)
      );
    },
    resetTheme: (state) => {
      state.themeSettings = defaultThemeSettings;
      localStorage.removeItem("themeSettings");
    },
  },
});


export const { updateTheme, resetTheme } = themeSlice.actions;


export default themeSlice.reducer;





