import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import {
  Container,
  Logo,
  Form,
  FormInput,
  SubmitButton,
  ToRegister,
} from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Logo source={logo} />
        <Form>
          <FormInput
            placeholder="Your email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={setEmail}
          />
          <FormInput
            placeholder="Your password"
            ref={passwordRef}
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setPassword}
          />
          <SubmitButton onPress={handleSubmit}>Log in</SubmitButton>
        </Form>
        <ToRegister onPress={() => navigation.navigate('SignUp')}>
          Create free account
        </ToRegister>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
