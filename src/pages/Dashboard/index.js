import React, { useState, useMemo, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { ActivityIndicator, Alert } from 'react-native';

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
  ListFooter,
  Loading,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [nextPage, setNextPage] = useState(2);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isThereMore, setIsThereMore] = useState(true);

  const formattedDate = useMemo(() => format(date, 'MMMM do'));

  function renderMeetupListFooter() {
    if (isThereMore) {
      return (
        <Loading>
          <ActivityIndicator animating size="large" />
        </Loading>
      );
    }
    return (
      <ListFooter>
        {meetups.length
          ? 'There are no more meetups for this day.'
          : 'There are no meetups marked to this day.'}
      </ListFooter>
    );
  }

  async function loadMeetups(page = 1) {
    try {
      const extractDate = format(date, 'yyyy-MM-dd');
      const response = await api.get(
        `meetups/?date=${extractDate}&page=${page}`
      );
      if (page < 2) {
        setMeetups(response.data);
        setIsRefreshing(false);
      } else {
        setMeetups([...meetups, ...response.data]);
        setNextPage(page + 1);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setIsThereMore(false);
        setIsRefreshing(false);
        console.tron.log(err.response.status);
      } else {
        setIsThereMore(false);
        setIsRefreshing(false);
        console.tron.log(err);
      }
    }
  }

  function setBannerSource(banner) {
    console.tron.log(banner);
    if (banner) {
      const sourceObject = {
        uri: banner.url.replace(/localhost/, '10.0.2.2'),
      };
      return sourceObject;
    }
    return defaultBanner;
  }

  useEffect(() => {
    loadMeetups();
  }, [date]);

  function refreshList() {
    setIsThereMore(true);
    setIsRefreshing(true);
    setNextPage(2);
    setMeetups([]);

    loadMeetups();
  }

  function changeDay(operation) {
    setMeetups([]);
    setIsThereMore(true);

    if (operation === 'add') {
      setDate(addDays(date, 1));
    }
    if (operation === 'sub') {
      setDate(subDays(date, 1));
    }
  }

  async function handleSubscribe(meetup) {
    try {
      await api.post(`subscriptions/${meetup.id}`);
      Alert.alert(`You have subscribed to ${meetup.name}.`);
      refreshList();
    } catch (err) {
      Alert.alert(String(err.response.data.error));
    }
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
            onEndReachedThreshhold={0.1}
            onRefresh={refreshList}
            refreshing={isRefreshing}
            ListFooterComponent={renderMeetupListFooter}
            onEndReached={() => loadMeetups(nextPage)}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup onSubscribe={() => handleSubscribe(item.id)}>
                <Banner source={setBannerSource(item.banner)} />
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

                  <SubscribeButton onPress={() => handleSubscribe(item)}>
                    Subscribe
                  </SubscribeButton>
                </Info>
              </Meetup>
            )}
          />
        </Content>
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
