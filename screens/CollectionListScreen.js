import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { colors } from '../assets/colors/colors';
import Header from '../components/general/Header';
import MiniButton from '../components/general/MiniButton';
import { Entypo, Feather } from '@expo/vector-icons';
import LoadingScreen from './LoadingScreen';
import NoData from '../components/general/NoData';
import { deleteCollection, getAllCollections } from '../assets/data/collections';
import CollectionItem from '../components/app/CollectionItem';
import { marginRight10 } from '../assets/commonStyles';

const CollectionListScreen = () => {
    const navigation = useNavigation();

    const [cols, setCols] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const colsData = await getAllCollections();
            if (colsData && colsData.length > 0) {
                setCols(colsData);
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
    
    const handleNewCols = () => {
        navigation.navigate('Add Collection');
    };
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
    }, []);
    
    const deleteFunc = async (id) => {
        setLoading(true);
        try {
            const res = await deleteCollection(id);
            if (res.rowsAffected > 0) {
                Alert.alert('Success', 'Collection deleted successfully.');
        
                // Update the local state to remove the deleted quote
                setCols(prevCols => prevCols.filter(cols => cols.id !== id));
            } else {
                Alert.alert('Error', 'Failed to delete the collection.');
            }
        } catch (error) {
            console.error('Error deleting collection:', error);
            Alert.alert('Error', 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        Alert.alert('search clicked')
    }

    const handleFollowBtnPress = (id, followStatus) => {
        //add follow function to save in db
        setCols(prevCols => 
            prevCols.map(cols => 
                cols.id === id ? { ...cols, follow: followStatus } : cols
            )
        );
    };
    

    if(loading){
        return <LoadingScreen />
    }

    return (
        <View style={styles.container}>
            <Header
                text={'Collections'}
                handleGoBack={navigation.goBack}
                component={
                    <View style={styles.btnSetWrapper}>
                        <MiniButton
                            bgColor={colors.bgColorSec}
                            func={handleSearch}
                            content={<Feather name="search" size={24} color={colors.textColorSec} />}
                            wrapperStyles={marginRight10}
                        />
                        <MiniButton
                            bgColor={colors.bgColorSec}
                            func={handleNewCols}
                            content={<Entypo name="plus" size={24} color={colors.textColorSec} />}
                        />
                    </View>
                }
            />
            {cols.length > 0 ? (
                <FlatList
                    data={cols}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CollectionItem itemData={item} handleFollowBtnPress={handleFollowBtnPress} />}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            ) : (
                <NoData text={'No Collections Yet!'} onRefresh={onRefresh} />
            )}
        </View>
    )
}

export default CollectionListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColorPri,
        padding: 20,
    },
    formWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    labelTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 16,
        color: colors.textColorPri,
        marginBottom: 20,
        marginLeft: 2,
        textAlign: 'justify',
    },
    btnTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textColorSec,
    },
    btnSetWrapper: {
        flexDirection: 'row',
    },
})