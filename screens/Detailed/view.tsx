import { FontAwesome } from "@expo/vector-icons";
import { strings } from "@Localization";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@ThemeContext";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { WebViewScreen } from "../../components/webview/index";
import styles from "./styles";

interface Route {
  params: {
    article: {
      author: string;
      title: string;
      urlToImage: string;
      publishedAt: string;
      url: string;
      content: string;
    };
    articleIndex: number;
  };
}
const DetailedView: React.FC<{ props: Route }> = ({}) => {
  const route = useRoute();
  const article = route.params.item;
  const [isVisible, setIsVisible] = useState(false);
  const handleURLPress = useCallback(() => {
    setIsVisible(true);
  }, []);

  const navigation = useNavigation();

  ///
  const { theme } = useTheme();
  ///

  return (
    <>
      <TouchableOpacity
        style={styles.crossContainer}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <FontAwesome
          style={styles.cross}
          name="arrow-left"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.ImageCont}>
          <Image
            source={{
              uri: article.urlToImage
                ? article.urlToImage
                : "https://arts.tu.edu.ly/wp-content/uploads/2020/02/placeholder.png",
              cache: "force-cache",
            }}
            style={styles.posterImage}
          />
        </View>
        <Text style={[styles.author, { color: "#60935F" }]}>
          {strings("ArticleBy")} {article?.author ? article?.author : "Unknown"}
        </Text>
        <Text style={[styles.Time, { color: "#60935F" }]}>
          {moment(article?.publishedAt).format("lll")}
        </Text>
        <Text style={[styles.title, { color: theme.text }]}>
          {article?.title}
        </Text>
        <Text style={[styles.content, { color: theme.text }]}>
          {article?.content}
        </Text>
      </ScrollView>
    </>
  );
};
export default DetailedView;
