/* eslint-disable prettier/prettier */

import { Dimensions, Platform, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  containerLight: { backgroundColor: "#FEFEFE" },
  containerDark: { backgroundColor: "#212121" },
  Title: {
    fontSize: 15,
  },
  titleDark: { color: "#FEFEFE" },
  titleLight: { color: "#212121" },
  SearchInput: {
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 15,
    borderColor: "#009688",

    width: "95%",
    shadowOffset: { height: 5, width: 0 },
    shadowColor: "gray",
    shadowRadius: 6.68,
    elevation: 11,
  },
});
export default styles;
