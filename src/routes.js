import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { Container } from './styles';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
// import Dashboard from '~/pages/Dashboard';

export default (isSigned = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        SignUp,
      },
      {
        initialRouteName: 'SignIn',
      }
    )
  );
};
