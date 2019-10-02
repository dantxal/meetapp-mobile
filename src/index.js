import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { View } from 'react-native';

import '~/config/ReactotronConfig';
import { store, persistor } from '~/store';

// import { Container } from './styles';

import Routes from '~/routes';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
