import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const DateSelector = styled.View`
  margin: 30px 0;

  flex-direction: row;
  align-items: center;
`;

export const ChangeDate = styled.TouchableOpacity``;

export const DateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  font-family: 'Helvetica';
  margin: 0 15px;
  color: #fff;
`;

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { alignItems: 'center' },
})`
  width: 100%;
`;

export const Meetup = styled.View`
  width: 335px;
  padding-bottom: 10px;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;

  margin: 10px 30px;

  flex-direction: column;
  align-items: center;
`;

export const Banner = styled.Image`
  width: 345px;
  height: 150px;
`;
export const Info = styled.View`
  padding: 5px 18px;

  flex: 1 0;
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
`;
export const Title = styled.Text`
  font-size: 18px;
  font-family: 'Helvetica';
  font-weight: bold;
  color: #333;
`;
export const Detail = styled.View`
  margin-left: 2px;
  margin-top: 12px;
  flex-direction: row;
  align-items: center;
`;
export const DetailText = styled.Text`
  color: #999;
  font-size: 13px;
  margin-left: 5px;
`;

export const SubscribeButton = styled(Button)`
  height: 40px;
  margin-top: 16px;
`;

export const ListFooter = styled.Text`
  position: relative;
  padding: 20px;
  align-self: center;
  border-radius: 4px;
  color: #fff;
  font-family: 'Helvetica';
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  line-height: 36px;
`;

export const Loading = styled.View`
  position: relative;
  padding: 20px;
  border-color: #fff;
`;
