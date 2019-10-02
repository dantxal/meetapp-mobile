import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { Container } from './styles';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

export default function Routes() {
  return createAppContainer(
    createSwitchNavigator({
      SignIn,
      SignUp,
    })
  );
}
