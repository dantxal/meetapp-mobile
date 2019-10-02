import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import Header from '~/components/Header';

import {
  Container,
  Form,
  FormInput,
  Separator,
  UpdateButton,
  Logout,
} from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest(name, email, oldPassword, password, confirmPassword)
    );
  }
  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            placeholder="Full name"
            autoCorrect={false}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            onChangeText={setName}
            value={name}
          />
          <FormInput
            ref={emailRef}
            placeholder="Your email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            onChangeText={setEmail}
            value={email}
          />
          <Separator />
          <FormInput
            ref={oldPasswordRef}
            placeholder="Old password"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={setOldPassword}
            value={oldPassword}
          />
          <FormInput
            ref={passwordRef}
            placeholder="New password"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            onChangeText={setPassword}
            value={password}
          />
          <FormInput
            ref={confirmPasswordRef}
            placeholder="Confirm password"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <UpdateButton onPress={handleSubmit}>Update Profile</UpdateButton>
        </Form>
        <Logout onPress={handleLogout}>Logout</Logout>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
