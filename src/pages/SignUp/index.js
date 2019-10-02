import React, { useState, useRef } from 'react';
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
import { signUpRequest } from '~/store/modules/auth/actions';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Background>
      <Container>
        <Logo source={logo} />
        <Form>
          <FormInput
            placeholder="Full name"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            onChangeText={setName}
          />
          <FormInput
            ref={emailRef}
            placeholder="Your email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={setEmail}
          />
          <FormInput
            ref={passwordRef}
            placeholder="Your password"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setPassword}
          />
          <SubmitButton onPress={handleSubmit}>Register</SubmitButton>
        </Form>
        <ToRegister onPress={() => navigation.navigate('SignIn')}>
          Already have an account?
        </ToRegister>
      </Container>
    </Background>
  );
}
