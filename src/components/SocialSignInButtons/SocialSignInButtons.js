import React from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../CustomButton';

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  const onSignInApple = () => {
    console.warn('onSignInApple');
  };

  return (
    <>
      <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        image = {require('../../../assets/images/facebook.png')}
      />
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
        image = {require('../../../assets/images/google.png')}
      />
      <CustomButton
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
        image = {require('../../../assets/images/apple.png')}

      />
    </>
  );
};

export default SocialSignInButtons;
