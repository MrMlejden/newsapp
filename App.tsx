import React, {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/ui/LoginScreen';
import NewsListScreen from './src/ui/NewsListScreen';
import ArticleScreen from './src/ui/ArticleScreen';

GoogleSignin.configure();

function App(): JSX.Element | null {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'News'}>
        <Stack.Screen name="News" component={NewsListScreen} />
        <Stack.Screen name="Article" component={ArticleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
