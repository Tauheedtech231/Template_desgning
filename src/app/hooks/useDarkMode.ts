// app/hooks/useDarkMode.ts
import { useState, useEffect } from 'react';

export function useDarkMode(): boolean {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const html = document.documentElement;
      const localSetting = localStorage.getItem('settings');
      const systemDark = html.classList.contains('dark');
      let localDark = false;

      if (localSetting) {
        try {
          localDark = JSON.parse(localSetting).darkMode;
        } catch {
          localDark = false;
        }
      }

      setIsDarkMode(systemDark || localDark);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  return isDarkMode;
}