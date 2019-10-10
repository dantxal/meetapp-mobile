import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { withNavigationFocus } from 'react-navigation';
import { ActivityIndicator, Alert } from 'react-native';

import api from '~/services/api';
import correctBannerSource from '~/util/correctBannerSource';

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

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [nextPage, setNextPage] = useState(2);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isThereMore, setIsThereMore] = useState(true);

  const formattedDate = useMemo(() => format(date, 'MMMM do'), [date]);

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
          : 'There are no meetups scheduled to this day.'}
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
      } else {
        setIsThereMore(false);
        setIsRefreshing(false);
      }
    }
  }

  useEffect(() => {
    if (isFocused) loadMeetups();
  }, [date, isFocused]);//eslint-disable-line

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
      Alert.alert('Success!', `You have subscribed to ${meetup.name}.`);
      refreshList();
    } catch (err) {
      Alert.alert('Error', err.response.data.error);
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
              <Meetup
                onSubscribe={() => handleSubscribe(item.id)}
                past={item.past}
              >
                <Banner source={correctBannerSource(item.banner)} />
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
                    <DetailText>{item.location}</DetailText>
                  </Detail>
                  <Detail>
                    <Icon name="person" size={14} color="#999" />
                    <DetailText>{`Promoter: ${item.user.name}`}</DetailText>
                  </Detail>

                  <SubscribeButton
                    onPress={() => (item.past ? null : handleSubscribe(item))}
                    past={item.past}
                    style={item.past && { backgroundColor: '#666' }}
                  >
                    {item.past
                      ? `Past (${format(
                          parseISO(item.date),
                          "MMMM do, 'at' H:mm aa"
                        )})`
                      : 'Subscribe'}
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

export default withNavigationFocus(Dashboard);
