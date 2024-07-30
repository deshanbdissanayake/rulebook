import { Image, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../assets/colors/colors';
import { Feather } from '@expo/vector-icons';

const NoData = ({ text = 'No Data', showImg = true, onRefresh = null }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshFunc = async () => {
    setRefreshing(true);
    // Simulate a network request or data fetching
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={!onRefresh ? onRefreshFunc : onRefresh}
        />
      }
    >
      {showImg && (
        <Feather name="cloud-off" size={80} color={colors.textColorPri} />
      )}
      <Text style={styles.textStyles}>{text}</Text>
    </ScrollView>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    fontFamily: 'ms-light',
    fontWeight: '400',
    fontSize: 18,
    color: colors.textColorPri,
    textAlign: 'center',
    marginTop: 10,
  },
});
