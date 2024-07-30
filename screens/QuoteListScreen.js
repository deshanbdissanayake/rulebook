import { Alert, FlatList, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { colors } from '../assets/colors/colors';
import Header from '../components/general/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import { getAllQuotes } from '../assets/data/quotes';
import MiniButton from '../components/general/MiniButton';
import { Entypo } from '@expo/vector-icons';
import QuoteListItem from '../components/app/QuoteListItem';
import { deleteQuote } from '../assets/data/database';
import NoData from '../components/general/NoData';

const QuoteListScreen = () => {
  const navigation = useNavigation();

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const quotesData = await getAllQuotes();
      if (quotesData && quotesData.length > 0) {
        setQuotes(quotesData);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleNewQuote = () => {
    navigation.navigate('Add Quote');
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const deleteFunc = async (id) => {
    setLoading(true);
    try {
      const res = await deleteQuote(id);
      if (res.rowsAffected > 0) {
        Alert.alert('Success', 'Rules deleted successfully.');

        // Update the local state to remove the deleted quote
        setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== id));
      } else {
        Alert.alert('Error', 'Failed to delete the rule.');
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header
        text="Rules List"
        handleGoBack={navigation.goBack}
        component={
          <MiniButton
            content={<Entypo name="plus" size={24} color={colors.textColorSec} />}
            func={handleNewQuote}
            bgColor={colors.bgColorSec}
          />
        }
      />
      {quotes.length > 0 ? (
        <FlatList
          data={quotes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <QuoteListItem itemData={item} deleteFunc={deleteFunc} />}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <NoData text={'No Rules Yet!'} onRefresh={onRefresh} />
      )}
    </View>
  );
};

export default QuoteListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColorPri,
    padding: 20,
  },
});
