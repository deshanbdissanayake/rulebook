import { StyleSheet, View } from 'react-native'
import React from 'react'
import Subtitle from '../../../components/general/Subtitle'
import { colors } from '../../../assets/colors/colors';
import NoData from '../../../components/general/NoData';
import SummaryCard from '../../../components/app/SummaryCard';
import { btnColorSet, flexWrapper, marginTop10 } from '../../../assets/commonStyles';

const ProductSummary = ({ products }) => {
    return (
        <View style={styles.container}>
            <Subtitle text={'Products Summary'} />
              { products && products.length > 0 ? (
                <View style={[flexWrapper]}>
                      {products.map((item, i)=>{
                          return (
                              <SummaryCard
                                key={i}
                                name={item.label}
                                value={item.value}
                                filter={item.label == 'In Stock' ? 'in' : 'out'}
                                bgColor={btnColorSet.set_2[i]}
                                type={'product'}
                              />
                          )
                      })}
                  </View>
              ) : (
                <View style={[marginTop10]}>
                  <NoData text={'No Products Yet!'} />
                </View>
              ) }
        </View>
    )
}

export default ProductSummary

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgColorTer,
        width: '100%',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
})