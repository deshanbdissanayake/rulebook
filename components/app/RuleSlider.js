import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from '../../screens/LoadingScreen';
import QuoteComponent from './QuoteComponent';
import { getAllQuotes } from '../../assets/data/quotes';
import { colors } from '../../assets/colors/colors'
import MiniButton from '../general/MiniButton'

import { marginBottom10, marginBottom15, marginRight10 } from '../../assets/commonStyles'
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import NoData from '../general/NoData';

const RuleSlider = () => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [quotes, setQuotes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteId, setQuoteId] = useState(0);
  
  useEffect(() => {
    getData();
  }, []);
  
  useEffect(() => {
    if (quotes.length > 0) {
      const index = quoteIndex;
      if (index >= 0 && index < quotes.length) {
        setQuoteId(quotes[index].id);
      }
    }
  }, [quoteIndex, quotes]);

  const getData = async () => {
    try {
      let quotesData = await getAllQuotes();
      if(quotesData && quotesData.length > 0){
        let shuffledData = await shuffle(quotesData);
        setQuotes(quotesData)
        setQuoteId(quotesData[0].id);
      }
    } catch (error) {
      console.error('Error at RuleSlider.js: ', error)
    } finally {
      setLoading(false);
    }
  }

  const shuffle = async (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const hanldeRefreshQuotes = async () => {
    setLoading(true);
    await getData();
  }

  const hanldeNewQuote = () => {
    navigation.navigate('Add Quote');
  }

  /*
  const hanldeAddToCollection = () => {
    console.log('new quote');
  }

  const hanldeAddToFavourites = () => {
    console.log('fav');
  }
  */

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>
      {(quotes && quotes.length > 0) ? (
        <Carousel
          loop
          width={width}
          height={height}
          vertical={true}
          autoPlay={false}
          data={quotes}
          scrollAnimationDuration={300}
          renderItem={({ item }) => (
            <QuoteComponent data={item} />
          )}
          onSnapToItem={(index) => setQuoteIndex(index)}
        />
      ) : (
        <NoData text={'No Rules Yet!'} onRefresh={hanldeRefreshQuotes} />
      )}
      <View style={styles.leftBtnWrapper}>
      </View>
      <View style={styles.rightBtnWrapper}>
        <MiniButton
          func={hanldeRefreshQuotes}
          content={<MaterialCommunityIcons name="reload" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
          wrapperStyles={marginRight10}
        />
        <MiniButton
          func={hanldeNewQuote}
          content={<Entypo name="plus" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
        />
        {/* <MiniButton
          func={hanldeAddToCollection}
          content={<Ionicons name="copy-outline" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
          wrapperStyles={[marginRight10]}
        />
        <MiniButton
          func={hanldeAddToFavourites}
          content={<Ionicons name="heart-outline" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
        /> */}
      </View>
    </View>
  )
}

export default RuleSlider

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftBtnWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  rightBtnWrapper:{
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
})