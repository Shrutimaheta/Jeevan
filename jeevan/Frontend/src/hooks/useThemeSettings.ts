import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../core/redux/store';
import { resetTheme, updateTheme } from '../core/redux/themeSlice';

export function useThemeSettings() {
  const dispatch = useAppDispatch();
  const themeSettings = useAppSelector((state) => state.theme.themeSettings);

  useEffect(() => {
    const htmlElement: any = document.documentElement;
    Object.entries(themeSettings).forEach(([key, value]) => {
      htmlElement.setAttribute(key, value);
    });
  }, [themeSettings]);

  const handleUpdateTheme = useCallback((key: string, value: string) => {
    if (themeSettings["dir"] === "rtl" && key !== "dir") {
      dispatch(updateTheme({ dir: "ltr" }));
    }
    dispatch(updateTheme({ [key]: value }));
  }, [dispatch, themeSettings.dir]);

  const handleResetTheme = useCallback(() => {
    dispatch(resetTheme());
  }, [dispatch]);

  return { themeSettings, handleUpdateTheme, handleResetTheme };
} 