import { StyleSheet, View } from 'react-native'
import React from 'react'
import Subtitle from '../../../components/general/Subtitle'
import { colors } from '../../../assets/colors/colors';
import NoData from '../../../components/general/NoData';
import MiniButton from '../../../components/general/MiniButton';
import { Feather } from '@expo/vector-icons';
import SummaryCard from '../../../components/app/SummaryCard';
import { btnColorSet, flexWrapper, marginTop10 } from '../../../assets/commonStyles';

const OrderSummary = ({ orders, filter, setShowOrderSummaryFilter }) => {
    let filterText = filter == 'this_week' ? 'This Week' : filter == 'this_month' ? 'This Month' : 'Today';

    return (
        <View style={styles.container}>
            <Subtitle 
                text={'Order Summary'} 
                subText={filterText}
                component={
                    <MiniButton
                        content={<Feather name="more-vertical" size={18} color={colors.textColorPri} />}
                        func={() => setShowOrderSummaryFilter(true)}
                    />
                }
            />
            
            { orders[filter] && orders[filter].length > 0 ? (
                <View style={[flexWrapper]}>
                    {orders[filter].map((item, i)=>{
                        return (
                            <SummaryCard
                                key={i}
                                name={item.label}
                                value={item.value}
                                filter={filter}
                                bgColor={btnColorSet.set_1[i]}
                                type={'order'}
                            />
                        )
                    })}
                </View>
            ) : (
                <View style={[marginTop10]}>
                    <NoData text={'No Orders Yet!'} />
                </View>
            ) }
        </View>
    )
}

export default OrderSummary

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