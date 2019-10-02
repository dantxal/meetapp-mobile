import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
})`
  flex: 1;
  flex-direction: column;
`;

export const Logo = styled.Image`
  width: 41px;
  height: 42px;
`;

export const Form = styled.View`
  width: 100%;
`;

export const FormInput = styled(Input)`
  margin-top: 10px;
`;
export const UpdateButton = styled(Button)`
  margin-top: 15px;
`;

export const Logout = styled(Button)`
  width: 100%;
  height: 42px;
  background: #d44059;
  margin: 15px 30px 0;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 30px 0 10px;
`;
