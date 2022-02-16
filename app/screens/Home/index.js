/** @format */

import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  CardReport06,
  News43,
  Price2Col,
  Icon,
  PlaceholderLine,
  Placeholder,
  NewsList,
  SafeAreaView,
  Text,
  Transaction2Col,
} from '@components';
import { BaseColor, BaseStyle, useTheme } from '@config';
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from '@data';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  ScrollView,
  View,
  Image,
  Animated,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import HeaderHome from './HeaderHome';

const Home = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [topics, setTopics] = useState(HomeTopicData);
  const [channels, setChannels] = useState(HomeChannelData);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const goPost = (item) => () => {
    navigation.navigate('Post', { item: item });
  };

  const goPostDetail = (item) => () => {
    navigation.navigate('PostDetail', { item: item });
  };

  const goToCategory = () => {
    navigation.navigate('Category');
  };

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, { flex: 1 }]}
        edges={['right', 'top', 'left']}>
        {/* <HeaderHome /> */}
        <ScrollView
          contentContainerStyle={styles.paddingSrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ flexDirection: 'row', marginVertical: 15 }}>
            <View style={{ flex: 1, paddingRight: 7 }}>
              <CardReport06
                icon='box'
                title='Package'
                // price="$0.68"
                // style={{
                //   flexDirection: 'row',
                //   justifyContent: 'center',
                //   alignItems: 'center',
                //   padding: 50,
                // }}
                onPress={() => navigation.navigate('Package')}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 15 }}>
            <View style={{ flex: 1, paddingRight: 7 }}>
              <CardReport06
                icon='arrow-up'
                title='Vehicle'
                // price="$0.68"
                onPress={() => navigation.navigate('Billing')}
              />
            </View>
            <View style={{ flex: 1, paddingLeft: 7 }}>
              <CardReport06
                style={{ backgroundColor: BaseColor.kashmir }}
                icon='arrow-up'
                title='Asset'
                // price="$0.68"
                onPress={() => navigation.navigate('Billing')}
              />
            </View>
          </View>
          {/* <View style={styles.paddingContent}>
            <Categories style={{ marginTop: 10 }} />
          </View> */}
          {/* {loading ? renderPlaceholder() : renderContent()} */}
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Home;
