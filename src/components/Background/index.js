import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';

import { Container, LinearBg } from './styles';

export default function Background({ children }) {
  return (
    <Container onPress={Keyboard.dismiss}>
      <LinearBg>{children}</LinearBg>
    </Container>
  );
}

Background.propTypes = {
  children: PropTypes.string.isRequired,
};
