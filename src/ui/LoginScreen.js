import React, {useEffect, useState} from 'react';
import {VStack, Box, Button, Text} from '@react-native-material/core';
import ExternalService from '../services/ExternalServices';

async function onGoogleButtonPress() {
  await ExternalService.google()
    .then(() => {
      console.log('successfully logged in with google');
    })
    .catch(error => {
      console.log('failed to login with google: ', error);
    });
}

async function onFacebookButtonPress() {
  await ExternalService.facebook()
    .then(() => {
      console.log('successfully logged in with facebook');
    })
    .catch(error => {
      console.log('failed to login with facebook: ', error);
    });
}

const LoginScreen = () => {
  useEffect(() => {}, []);

  return (
    <VStack style={{}} spacing={20} m={30}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 300,
        }}>
        <Text variant={'h2'}>Welcome</Text>
      </Box>
      <Button title="Login with Facebook" onPress={onFacebookButtonPress} />
      <Button title="Login with Google" onPress={onGoogleButtonPress} />
    </VStack>
  );
};

export default LoginScreen;
