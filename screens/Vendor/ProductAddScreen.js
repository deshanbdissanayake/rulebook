import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { colors } from '../../assets/colors/colors'
import Header from '../../components/general/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Input from '../../components/general/Input'
import Button from '../../components/general/Button'
import MultiSelect from '../../components/general/MultiSelect'
import { container, labelTextStyles, marginBottom10, textLight14, textRegular14 } from '../../assets/commonStyles'
import Switch from '../../components/general/Switch'
import Select from '../../components/general/Select'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import MiniButton from '../../components/general/MiniButton'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { getAllCategories } from '../../assets/data/categories'
import { getAllTags } from '../../assets/data/tags'
import LoadingScreen from '../LoadingScreen'

const ProductAddScreen = ({ pro_id = null }) => {
  const navigation = useNavigation();

  const title = !pro_id ? 'Create Product' : 'Edit Product';

  const handleGoBack = () => {
    navigation.goBack();
  }

  const handleSubmitForm = () => {

  }

  const [loading, setLoading] = useState(true)
  const [imgNum, setImgNum] = useState(1); //for delete images
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const getData = async () => {
    try {
      let cats = await getAllCategories();
      let tgs = await getAllTags();

      const catArr = cats.map(cat => ({
        value: cat.cat_id,
        label: cat.cat_name
      }));
  
      const tagsArr = tgs.map(tag => ({
        value: tag.tag_id,
        label: tag.tag_name
      }));

      setCategories(catArr)
      setTags(tagsArr)
    } catch (error) {
      console.error('error at ProductAddScreen.js -> getData')
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(()=>{
      getData();
    },[])
  )

  const [formData, setFormData] = useState({
    pro_name: null,
    pro_sku: null,
    pro_desc: null,
    pro_images: [],
    pro_cat: [],
    pro_tags: [],
    pro_price: null,
    discount: {
      dis_status: false,
      dis_price: null,
      dis_start: null,
      dis_end: null,
    },
    stock_status: 'in'
  });

  const setDatePicker = () => {

  }

  const handleDate = (selectedDate, type) => {
    if(type == 'sdate'){
      setFormData((prevData) => ({ ...prevData, discount: {...prevData.discount, dis_start: selectedDate}}))
    }else{
      setFormData((prevData) => ({ ...prevData, discount: {...prevData.discount, dis_end: selectedDate}}))
    }
    setShowDatePicker(null)
  }

  const handleCategories = (selectedCategories) => {
    setFormData((prevData) => ({...prevData, pro_cat: selectedCategories}))
  }

  const handleTags = (selectedTags) => {
    setFormData((prevData) => ({...prevData, pro_tags: selectedTags}))
  }

  const handleDiscountStatus = (res)  => {
    setFormData((prevData) => ({
      ...prevData,
      discount: {
        ...prevData.discount,
        dis_status: res,
        dis_price: !res ? null : prevData.discount.dis_price,
        dis_start: !res ? null : prevData.discount.dis_start,
        dis_end: !res ? null : prevData.discount.dis_end
      },
    }));
  };

  const handleImageSelect = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if(!result.canceled) {
      setFormData((prevData) => ({
        ...prevData,
        pro_images: [
          ...prevData.pro_images,
          { img_id: imgNum, img: result.assets[0].uri, stt: 'active' }
        ]
      }));

      setImgNum(prevData => prevData+1);
    }
    
  };

  const handleRemoveImage = (del_img_id) => {
    setFormData(prevData => ({
        ...prevData,
        pro_images: prevData.pro_images.map((e) => 
            e.img_id === del_img_id ? { ...e, stt: 'delete' } : e
        )
    }));
  };

  // Function to format date as yyyy-mm-dd
  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={container}>
      <Header text={title} handleGoBack={handleGoBack} />
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formStyles}>

        <View style={[marginBottom10]}>
          <Text style={[labelTextStyles]}>Product Images</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                <TouchableOpacity onPress={handleImageSelect} style={styles.addImageWrapper}>
                    <AntDesign name="plus" size={24} color={colors.primary} />
                </TouchableOpacity>
                {formData.pro_images && formData.pro_images.length > 0 && (
                    formData.pro_images.map((imgData, index) => (
                        (imgData.stt !== 'delete') && (
                            <View key={index}>
                                <Image style={styles.imageStyles} source={{ uri: imgData.img }} />
                                <View style={styles.imageDelIconStyles} >
                                    <MiniButton
                                        func={() => handleRemoveImage(imgData.img_id)}
                                        content={<FontAwesome name="trash" size={24} color={colors.danger}/>}
                                        bgColor={colors.white}
                                    />
                                </View>
                            </View>
                        )
                    ))
                )}
            </ScrollView>
          </View>

          <View style={[marginBottom10]}>
            <Text style={[labelTextStyles]}>Product Name</Text>
            <Input
              keyboardType={'default'}
              value={formData.pro_name ?? ''}
              onChangeText={(text) => setFormData((prevData) => ({ ...prevData, pro_name: text }))}
              placeholder={'Enter Product Name'}
            />
          </View>
          <View style={[marginBottom10]}>
            <Text style={[labelTextStyles]}>Product SKU</Text>
            <Input
              keyboardType={'default'}
              value={formData.pro_sku ?? ''}
              onChangeText={(text) => setFormData((prevData) => ({ ...prevData, pro_sku: text }))}
              placeholder={'Enter Product SKU'}
            />
          </View>
          <View style={[marginBottom10]}>
            <Text style={[labelTextStyles]}>Product Description</Text>
            <Input
              keyboardType={'default'}
              value={formData.pro_desc ?? ''}
              onChangeText={(text) => setFormData((prevData) => ({ ...prevData, pro_desc: text }))}
              placeholder={'Enter Product Description'}
              multiline={true}
              textArea={true}
            />
          </View>
          <View style={[marginBottom10]}>
            <Text style={[labelTextStyles]}>Product Price</Text>
            <Input
              keyboardType={'numeric'}
              value={formData.pro_price ?? ''}
              onChangeText={(text) => setFormData((prevData) => ({ ...prevData, pro_price: text }))}
              placeholder={'Enter Product Price'}
            />
          </View>

          <View style={[marginBottom10]}>
            <Text style={[labelTextStyles]}>Discount</Text>
            <Switch
              switchStatus={formData.discount.dis_status}
              setSwitchStatus={(res) => handleDiscountStatus(res)}
            />
          </View>

          {formData.discount.dis_status && (
            <>
              <View style={[marginBottom10]}>
                <Text style={[labelTextStyles]}>Discount Price</Text>
                <Input
                  keyboardType={'numeric'}
                  value={formData.discount.dis_price ?? ''}
                  onChangeText={(text) => setFormData((prevData) => ({ ...prevData, discount: { ...prevData.discount, dis_price: text} }))}
                  placeholder={'Enter Discount Price'}
                />
              </View>
              <View style={[marginBottom10]}>
                <Text style={[labelTextStyles]}>Discount Start</Text>
                <Button
                  content={
                    <Text 
                      style={[textLight14]}>
                        {!formData.discount.dis_start ? 'Select Discount Start Date' : formatDate(formData.discount.dis_start)}
                    </Text>
                  }
                  func={() => setShowDatePicker('sdate')}
                  bdr={colors.border}
                  itemPosition={'flex-start'}
                />
              </View>
              <View style={[marginBottom10]}>
                <Text style={[labelTextStyles]}>Discount End</Text>
                <Button
                  content={
                    <Text 
                      style={[textLight14]}>
                        {!formData.discount.dis_end ? 'Select Discount End Date' : formatDate(formData.discount.dis_end)}
                    </Text>
                  }
                  func={() => setShowDatePicker('edate')}
                  bdr={colors.border}
                  itemPosition={'flex-start'}
                />
              </View>

              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={
                    showDatePicker === 'sdate' 
                      ? (formData.discount.dis_start || new Date()) 
                      : (formData.discount.dis_end || new Date())
                  }
                  mode={'date'}
                  onChange={(event, selectedDate) => handleDate(selectedDate, showDatePicker)}
                />
              )}
            </>
          )}

          <View style={[marginBottom10]}>
            <Text style={[labelTextStyles]}>Product Categories</Text>
            <MultiSelect
              value={formData.pro_cat}
              options={categories}
              onSelect={handleCategories}
            />
          </View>

          <View style={[marginBottom10]}>
            <Text style={[labelTextStyles]}>Product Tags</Text>
            <MultiSelect
              value={formData.pro_tags}
              options={tags}
              onSelect={handleTags}
            />
          </View>

          <View style={[marginBottom10]}>
            <Text style={[labelTextStyles]}>Stock Status</Text>
            <Select
              value={formData.pro_tags}
              options={[{value: 'in', label: 'Stock In'}, {value: 'out', label: 'Stock Out'}]}
              onSelect={(res) => setFormData((prevData) => ({...prevData, stock_status: res}))}
            />
          </View>
        </View>
        <View style={styles.btnStyles}>
          <Button
            bgColor={colors.bgColorSec}
            content={<Text style={{ color: colors.textColorSec, fontFamily: 'ms-regular'}}>Submit</Text>}
            func={handleSubmitForm}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default ProductAddScreen

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  addImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imageStyles: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },
  imageDelIconStyles: {
    position: 'absolute',
    right: 15,
    top: 5,
  },
})