import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CommentsService = {
  postComment: (articleId, comment) => {
    const currentUser = auth().currentUser;

    firestore().collection('comments').doc().set({
      userId: currentUser.uid,
      displayName: currentUser.displayName,
      comment: comment,
      articleUrl: articleId,
    });
  },
};

export default CommentsService;
