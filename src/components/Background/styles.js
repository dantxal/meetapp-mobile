import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const LinearBg = styled(LinearGradient).attrs({
  colors: ['#22202c', '#402845'],
})`
  flex: 1;
`;
