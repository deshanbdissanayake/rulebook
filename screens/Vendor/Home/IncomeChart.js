import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import Subtitle from '../../../components/general/Subtitle'
import { colors } from '../../../assets/colors/colors';
import NoData from '../../../components/general/NoData';
import { marginTop10, marginTop5 } from '../../../assets/commonStyles';
import { LineChart} from "react-native-gifted-charts";

const IncomeChart = ({ incomeData }) => {
    return (
        <View style={styles.container}>
            <Subtitle text={'Monthly Income'} />
            {incomeData && incomeData.data.length > 0 ? (
                <View style={[marginTop5, { overflow: 'hidden' }]}>
                    <LineChart 
                        data = {incomeData.data}
                        color={colors.textColorPri}
                        thickness={3}
                        dataPointsColor={colors.primary}
                        width={Dimensions.get('screen').width - 120}
                        yAxisLabelWidth={80}
                        spacing={40}
                        yAxisTextStyle={{fontFamily: 'ms-regular'}}
                        xAxisLabelTextStyle={{fontFamily: 'ms-regular'}}
                        maxValue={incomeData.maxValue}
                    />
                </View>
            ) : (
                <View style={[marginTop10]}>
                  <NoData text={'No Income Data Yet!'} />
                </View>
            )}
        </View>
    )
}

export default IncomeChart

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