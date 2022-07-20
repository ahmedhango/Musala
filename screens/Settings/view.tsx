import { LANG_KEY } from "@ConstantsValues";
import { changeLanguage, strings } from "@Localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "@ThemeContext";
import CustomButton from "components/CustomeButtom";
import { CustomText } from "components/CustomText";
import React, { useEffect, useState } from "react";
import { Switch, View } from "react-native";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";

///
export default function SettingsView(
  { navigation }: RootTabScreenProps<"Settings">,
  props: any
) {
  const onLanguageChanged = async (language: "en" | "de") => {
    changeLanguage(language);
  };
  ///
  const isFocused = useIsFocused();
  const { theme, updateTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [ButtonStateForEn, setButtonStateForEn] = useState(false);
  const [ButtonStateForDE, setButtonStateForDE] = useState(false);
  const [LangSelected, setLangSelected] = useState("");
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    changeTheme();
  };
  const changeTheme = () => {
    updateTheme(theme.ThemeMode);
  };

  const getCurrentLang = async () => {
    try {
      let retrievedItem: any;
      if (LANG_KEY == null) {
        let allKeys = await AsyncStorage.getAllKeys();
        retrievedItem = await AsyncStorage.multiGet(allKeys);
      } else {
        retrievedItem = await AsyncStorage.getItem(LANG_KEY);
      }
      return (
        JSON.parse(retrievedItem),
        setLangSelected(retrievedItem),
        LangSelected.includes("en")
          ? setButtonStateForEn(true)
          : LangSelected.includes("de")
          ? setButtonStateForDE(true)
          : false,
        console.log(LangSelected)
      );
    } catch (error) {}
  };
  useEffect(() => {
    getCurrentLang();
  }, [isFocused]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.ModeSwitchCont}>
        <CustomText color={theme.text} size={24}>
          {strings("ChangeModes")}
        </CustomText>
        <Switch
          trackColor={{ false: "#60935F", true: "#fff" }}
          thumbColor={isEnabled ? "#60935F" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.ModeSwitchCont}>
        <CustomText color={theme.text} size={24}>
          {strings("ChangeLanguage")}
        </CustomText>
        <CustomButton
          disabled={ButtonStateForEn}
          onPress={() => onLanguageChanged("en")}
        >
          <CustomText color={theme.text}>{"English"}</CustomText>
        </CustomButton>
        <CustomButton
          disabled={ButtonStateForDE}
          onPress={() => onLanguageChanged("de")}
        >
          <CustomText color={theme.text}>{"German"}</CustomText>
        </CustomButton>
      </View>
    </View>
  );
}
