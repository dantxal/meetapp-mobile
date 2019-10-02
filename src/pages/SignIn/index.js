import React from 'react';
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

function handleSubmit() {}

export default function SignIn({ navigation }) {
  return (
    <Background>
      <Container>
        <Logo source={logo} />
        <Form>
          <FormInput placeholder="Your email" />
          <FormInput placeholder="Your password" />
          <SubmitButton onPress={handleSubmit}>Log in</SubmitButton>
        </Form>
        <ToRegister onPress={() => navigation.navigate('SignUp')}>
          Create free account
        </ToRegister>
      </Container>
    </Background>
  );
}
