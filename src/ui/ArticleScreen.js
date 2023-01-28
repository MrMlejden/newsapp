import React, {useEffect, useState} from 'react';
import {
  VStack,
  Box,
  TextInput,
  Text,
  Button,
  HStack,
  ListItem,
} from '@react-native-material/core';
import {ScrollView} from 'react-native';
import CommentsService from '../services/CommentsService';
import firestore from '@react-native-firebase/firestore';

const ArticleScreen = props => {
  const article = props.route.params.article;

  const [comment, setComment] = useState('');
  const [articleComments, setArticleComments] = useState([]);

  const onSubmit = () => {
    CommentsService.postComment(article.url, comment);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('comments')
      .where('articleUrl', '==', article.url)
      .onSnapshot(snapshot => {
        setArticleComments([]);
        snapshot.forEach(document => {
          setArticleComments(comments => [...comments, document.data()]);
        });
      });
    return () => subscriber();
  }, []);

  return (
    <ScrollView style={{margin: 20}}>
      <VStack spacing={20}>
        <Box>
          <Text variant={'h5'}>{article.title.toUpperCase()}</Text>
          <Text variant={'overline'}>
            {new Date(article.publishedAt).toDateString()}
          </Text>
        </Box>
        <VStack spacing={10}>
          <Text variant={'body2'}>{article.content}</Text>
          <Text variant={'caption'} color={'gray'}>
            Source: {article.url}
          </Text>
        </VStack>
        <VStack spacing={10}>
          <Text variant={'button'}>Comments</Text>
          {articleComments.map(comment => {
            return (
              <ListItem
                title={comment.comment}
                secondaryText={comment.displayName}
              />
            );
          })}
          <HStack wrap={true} style={{marginTop: 20}}>
            <TextInput
              style={{flex: 1}}
              variant="outlined"
              value={comment}
              onChangeText={text => {
                setComment(text);
              }}
            />
            <Button
              title={'send'}
              variant="outlined"
              style={{}}
              onPress={() => {
                onSubmit();
                setComment('');
              }}
            />
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default ArticleScreen;
