import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from '../../screens/LoadingScreen';
import RuleComponent from './RuleComponent';
import { getAllRules } from '../../assets/data/rules';
import { colors } from '../../assets/colors/colors'
import MiniButton from '../general/MiniButton'

import { marginRight10 } from '../../assets/commonStyles'
import { Entypo, Ionicons } from '@expo/vector-icons'

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
      let quotesData = await getAllRules();
      if(quotesData && quotesData.length > 0){
        setQuotes(quotesData)
        setQuoteId(quotesData[0].id);
      }
    } catch (error) {
      console.error('Error at RuleSlider.js: ', error)
    } finally {
      setLoading(false);
    }
  }

  const hanldeNewQuote = () => {
    navigation.navigate('Add Quote');
  }

  const hanldeAddToCollection = () => {
    console.log('new quote');
  }

  const hanldeAddToFavourites = () => {
    console.log('fav');
  }

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>
      {(quotes && quotes.length > 0) && (
        <Carousel
          loop
          width={width}
          height={height}
          vertical={true}
          autoPlay={false}
          data={quotes}
          scrollAnimationDuration={300}
          renderItem={({ item }) => (
            <RuleComponent data={item} />
          )}
          onSnapToItem={(index) => setQuoteIndex(index)}
        />
      )}
      <View style={styles.addBtnWrapper}>
        <MiniButton
          func={hanldeNewQuote}
          content={<Entypo name="plus" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
        />
      </View>
      <View style={styles.favBtnWrapper}>
        <MiniButton
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
        />
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
  addBtnWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  favBtnWrapper:{
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
})