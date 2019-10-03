import React, { useState, useMemo, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import { ActivityIndicator, Alert } from 'react-native';

import api from '~/services/api';
import defaultBanner from '~/assets/defaultBanner.png';

import Header from '~/components/Header';
import Background from '~/components/Background';

import {
  Container,
  Content,
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

// import { Container } from './styles';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [nextPage, setNextPage] = useState(2);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isThereMore, setIsThereMore] = useState(true);

  function renderSubscriptionListFooter() {
    if (isThereMore) {
      return (
        <Loading>
          <ActivityIndicator animating size="large" />
        </Loading>
      );
    }
    return (
      <ListFooter>
        {subscriptions.length
          ? 'You have no more subscriptions yet.'
          : 'You have no subscriptions yet.  \n Pull down to refresh.'}
      </ListFooter>
    );
  }

  async function loadSubscriptions(page = 1) {
    try {
      const response = await api.get(`subscriptions/?page=${page}`);
      if (page < 2) {
        setSubscriptions(response.data);
        setIsRefreshing(false);
      } else {
        setSubscriptions([...subscriptions, ...response.data]);
        setNextPage(page + 1);
      }
    } catch (err) {
      if (err.response.status === 404) {
        setIsThereMore(false);
        setIsRefreshing(false);
      }
    }
  }

  function setBannerSource(banner) {
    if (banner) {
      const sourceObject = {
        uri: banner.url.replace(/localhost/, '10.0.2.2'),
      };
      return sourceObject;
    }
    return defaultBanner;
  }

  useEffect(() => {
    loadSubscriptions();
  }, []);

  function refreshList() {
    setIsThereMore(true);
    setIsRefreshing(true);
    setNextPage(2);
    setSubscriptions([]);

    loadSubscriptions();
  }

  async function handleCancelSubscription(subscription) {
    try {
      const response = await api.delete(`subscriptions/${subscription.id}`);
      Alert.alert(`You have unsubscribed from ${response.data.meetup.name}.`);
      refreshList();
    } catch (err) {
      if (err.response.status === 404) {
        setIsThereMore(false);
        setIsRefreshing(false);
      }
      Alert.alert(String(err.response.data.error));
    }
  }
  return (
    <Background>
      <Container>
        <Header />
        <Content>
          <MeetupsList
            data={subscriptions}
            onEndReachedThreshhold={0.1}
            onRefresh={refreshList}
            refreshing={isRefreshing}
            ListFooterComponent={renderSubscriptionListFooter}
            onEndReached={() => loadSubscriptions(nextPage)}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup onSubscribe={() => handleCancelSubscription(item.id)}>
                <Banner source={setBannerSource(item.banner)} />
                <Info>
                  <Title>{item.meetup.name}</Title>
                  <Detail>
                    <Icon name="event" size={14} color="#999" />
                    <DetailText>
                      {format(
                        parseISO(item.meetup.date),
                        "MMMM do, 'at' H:mm aa"
                      )}
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

                  <SubscribeButton
                    onPress={() => handleCancelSubscription(item)}
                  >
                    Cancel Subscription
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

Subscriptions.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
