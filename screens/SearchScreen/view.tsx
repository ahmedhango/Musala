/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import { ApiKeyForNews, Url } from "@ConstantsValues";
import { useTheme } from "@ThemeContext";
import axios from "axios";
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  NativeBaseProvider,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import styles from "./styles";
// create a component
const News = ({ navigation }) => {
  const { theme } = useTheme();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [MasterData, setMasterData] = useState([]);
  const [Search, setSearch] = useState("");
  useEffect(() => {
    GetNewsFromApi();
  }, []);
  function GetNewsFromApi() {
    axios(Url + ApiKeyForNews)
      .then((res) => {
        setNews(res.data.articles);
        setMasterData(res.data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const searchFilter = (text: string) => {
    if (text) {
      const newData = MasterData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setNews(newData);
      setSearch(text);
    } else {
      setNews(MasterData);
      setSearch(text);
    }
  };

  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <NativeBaseProvider>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <TextInput
          placeholder="search here"
          style={styles.SearchInput}
          value={Search}
          onChangeText={(text) => searchFilter(text)}
          placeholderTextColor="gray"
        />
        <FlatList
          data={news}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack space={3} justifyContent="space-between">
                <Avatar
                  size="50px"
                  source={{
                    uri: item.urlToImage
                      ? item.urlToImage
                      : "https://arts.tu.edu.ly/wp-content/uploads/2020/02/placeholder.png",
                  }}
                />
                <VStack style={{ width: "80%" }}>
                  <Text
                    onPress={() => {
                      navigation.navigate("Detailed", {
                        item: item,
                      });
                    }}
                    style={[styles.Title, { color: theme.text }]}
                  >
                    {item.title}
                  </Text>
                </VStack>
                <Spacer />
              </HStack>
            </Box>
          )}
          keyExtractor={() => uuid.v4()?.toString()}
          refreshing={isLoading}
          onRefresh={GetNewsFromApi}
        />
      </View>
    </NativeBaseProvider>
  );
};

// define your styles

//make this component available to the app
export default News;
