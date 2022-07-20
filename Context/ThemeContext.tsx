import {light, dark} from "@ColorConstants/";
import React, {createContext, useState, useContext, useEffect} from "react";
import {_retrieveData, _storeData} from "@StorageController/";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ThemeContextValue = createContext();
import {ModeKey} from "@ConstantsValues/";
export const ThemeContext = ({children}) => {
  useEffect(() => {
    getTheme();
  }, []);
  const [theme, setTheme] = useState<any>(light);
  const [isThemeLoading, setIsThemeLoading] = useState(true);
  const getTheme = async () => {
    const themeModeValue = await _retrieveData(ModeKey);
    if (themeModeValue !== null) {
      (await themeModeValue) === "light" ? setTheme(light) : setTheme(dark);
      setIsThemeLoading(false);
    }
    console.log(themeModeValue);
    setIsThemeLoading(false);
  };

  const updateTheme = (currentThemeMode: string) => {
    const newTheme = currentThemeMode === "light" ? dark : light;
    console.log(newTheme);
    setTheme(newTheme);
    _storeData(ModeKey, newTheme.ThemeMode);
  };
  return (
    <ThemeContextValue.Provider value={{theme, updateTheme, isThemeLoading}}>
      {children}
    </ThemeContextValue.Provider>
  );
};
export const useTheme = () => useContext(ThemeContextValue);
