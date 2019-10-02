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

export default function SignUp({ navigation }) {
  return (
    <Background>
      <Container>
        <Logo source={logo} />
        <Form>
          <FormInput placeholder="Full name" />
          <FormInput placeholder="Your email" />
          <FormInput placeholder="Your password" />
          <SubmitButton>Log in</SubmitButton>
        </Form>
        <ToRegister onPress={() => navigation.navigate('SignIn')}>
          Already have an account?
        </ToRegister>
      </Container>
    </Background>
  );
}
