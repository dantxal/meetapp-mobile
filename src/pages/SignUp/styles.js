import styled from 'styled-components/native';

import Button from '~/components/Button';
import ButtonLink from '~/components/ButtonLink';
import Input from '~/components/Input';

export const Container = styled.View`
  flex: 1;
  margin: 0 30px;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Logo = styled.Image`
  width: 41px;
  height: 42px;
`;

export const Form = styled.View`
  margin-top: 40px;
  width: 100%;
`;

export const FormInput = styled(Input)`
  margin-top: 10px;
`;
export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

export const ToRegister = styled(ButtonLink)`
  margin-top: 15px;
  background: rgba(0, 0, 0, 0);
`;
