import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from '../../screens/LoadingScreen';
import RuleComponent from './RuleComponent';
import { getAllRules } from '../../assets/data/rules';

const RuleSlider = () => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [quotes, setQuotes] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    getData();
  },[])

  const getData = async () => {
    try {
      let quotesData = await getAllRules();
      setQuotes(quotesData)
    } catch (error) {
      console.error('Error at RuleSlider.js: ', error)
    } finally {
      setLoading(false);
    }
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
        />
      )}
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
  }
})