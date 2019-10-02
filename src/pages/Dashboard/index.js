import React, { useState, useMemo, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, addDays, subDays, parseISO } from 'date-fns';

import api from '~/services/api';
import defaultBanner from '~/assets/defaultBanner.png';

import Header from '~/components/Header';
import Background from '~/components/Background';

import {
  Container,
  Content,
  DateSelector,
  ChangeDate,
  DateText,
  MeetupsList,
  Meetup,
  Banner,
  Info,
  Title,
  Detail,
  DetailText,
  SubscribeButton,
  AlertMessage,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [endOfPage, setEndOfPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const formattedDate = useMemo(() => format(date, 'MMMM do'));

  async function showEndOfPage() {
    setEndOfPage(true);
    await setInterval(() => {
      setEndOfPage(false);
    }, 4000);
  }

  async function loadMeetups(page = 1) {
    try {
      setLoading(true);
      const extractDate = format(date, 'yyyy-MM-dd');
      const response = await api.get(
        `meetups/?date=${extractDate}&page=${page}`
      );
      setMeetups(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response.status === 404) {
        setMeetups([]);
        setLoading(false);
        await showEndOfPage();
      }
    }
  }

  useEffect(() => {
    loadMeetups();
  }, [date]);

  function changeDay(operation) {
    if (operation === 'add') {
      setDate(addDays(date, 1));
    }
    if (operation === 'sub') {
      setDate(subDays(date, 1));
    }
  }

  async function handleSubscribe(meetupId) {
    const response = await api.post(`subscriptions/${meetupId}`);
  }
  return (
    <Background>
      <Container>
        <Header />
        <Content>
          <DateSelector>
            <ChangeDate onPress={() => changeDay('sub')}>
              <Icon name="chevron-left" size={30} color="#fff" />
            </ChangeDate>
            <DateText>{formattedDate}</DateText>
            <ChangeDate onPress={() => changeDay('add')}>
              <Icon name="chevron-right" size={30} color="#fff" />
            </ChangeDate>
          </DateSelector>

          <MeetupsList
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup onSubscribe={() => handleSubscribe(item.id)}>
                <Banner source={defaultBanner} />
                <Info>
                  <Title>{item.name}</Title>
                  <Detail>
                    <Icon name="event" size={14} color="#999" />
                    <DetailText>
                      {format(parseISO(item.date), "MMMM do, 'at' H:mm aa")}
                    </DetailText>
                  </Detail>
                  <Detail>
                    <Icon name="place" size={14} color="#999" />
                    <DetailText>Wall Street, 7777</DetailText>
                  </Detail>
                  <Detail>
                    <Icon name="person" size={14} color="#999" />
                    <DetailText>Promoter: Diego Fernandes</DetailText>
                  </Detail>

                  <SubscribeButton>Subscribe</SubscribeButton>
                </Info>
              </Meetup>
            )}
          />
        </Content>
        {endOfPage && (
          <AlertMessage>There are no more meetups for this day.</AlertMessage>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
