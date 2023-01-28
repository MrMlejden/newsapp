import React, {useEffect, useState} from 'react';
import {VStack, Box, Button, Text, ListItem} from '@react-native-material/core';
import fetchHeadlineNews from '../services/NewsService';
import {ScrollView} from 'react-native';

const NewsListScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const news = await fetchHeadlineNews();
      // console.log("news: ", news.articles);
      setNews(news.articles);
    };
    getNews();
  }, []);

  return (
    <ScrollView>
      {news.map(item => {
        return (
          <ListItem
            key={item.url}
            title={item.title}
            secondaryText={item.description}
            onPress={() => {
              navigation.navigate('Article', {article: item});
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default NewsListScreen;
