/** @format */

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Button,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { TextInput } from '@components';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Picker } from '@react-native-picker/picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BaseColor, BaseStyle, useTheme } from '@config';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/core';

import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import axios from 'axios';

export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';

const Package = (props) => {
  const { navigation, route } = props;

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [nameDelivery, setNameDelivery] = useState('');
  const [hpDelivery, setHpDelivery] = useState('');
  const [nameSender, setSenderName] = useState('');
  const [hpSender, setSenderHp] = useState('');
  const [quantity, setQuantity] = useState('');
  const [dataGate, setDataGate] = useState([]);
  const [dataTower, setDataTower] = useState([]);
  const [dataUnit, setDataUnit] = useState([]);
  const [dataCust, setDataCust] = useState([]);
  const [dataType, setDataType] = useState([]);

  const [valueTower, setValueTower] = useState('');
  const [valueUnit, setValueUnit] = useState('');
  const [valueCust, setValueCust] = useState({});

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 1000);
  }, []);

  const valueNameDelivery = (index) => {
    console.log('name', index);

    setNameDelivery(index);
  };

  const valueHpDelivery = (index) => {
    console.log('hpdeli', index);

    setHpDelivery(index);
  };

  const valueSenderName = (index) => {
    console.log('sendername', index);

    setSenderName(index);
  };

  const valueQuantity = (index) => {
    console.log('Quantity', index);

    setQuantity(index);
  };

  const valueSenderHp = (index) => {
    console.log('senderhp', index);

    setSenderHp(index);
  };

  const fetchGate = async () => {
    try {
      const res = await axios.get(
        'http://34.87.121.155:2121/apiwebpbi/api/gate'
      );
      setDataGate(res.data.data);
      console.log('datagate', dataGate);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  };
  const fetchTower = async () => {
    try {
      const res = await axios.get(
        'http://34.87.121.155:2121/apiwebpbi/api/package/tower'
      );

      setDataTower(res.data.data);

      console.log('datatower', dataTower);
    } catch (error) {
      setErrors(error.ressponse.data);
    }
  };
  const towerNo = valueTower;
  console.log('datatowerss', towerNo);

  //   const fetchUnit = () => {
  //     axios
  //       .get(
  //         `http://34.87.121.155:2121/apiwebpbi/api/package/unit?entity=01&project=01&tower=${towerNo}`
  //       )
  //       .then((res) => {
  //         const allUnit = res.data.data;
  //         setDataUnit(allUnit);
  //       })
  //       .catch((error) => console.log(`Error: ${error}`));
  //   };

  const fetchUnit = async () => {
    // const towerNo = valueTower.lot_type;
    // console.log('datatowerss', towerNo);
    try {
      const res = await axios.get(
        `http://34.87.121.155:2121/apiwebpbi/api/package/unit?entity=01&project=01&tower=${towerNo}`
      );
      setDataUnit(res.data.data);
      console.log('dataunit', dataUnit);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  };

  const fetchCust = async () => {
    const unitNo = valueUnit.lot_no;
    console.log('dataUnit', unitNo);
    const towerNo = valueTower.lot_type;
    console.log('datatowerss', towerNo);

    try {
      const res = await axios.get(
        `http://34.87.121.155:2121/apiwebpbi/api/package/unit/tenant?entity=01&project=01&tower=${towerNo}&lotno=${unitNo}`
      );
      setDataCust(res.data.data);
      console.log('dataunit', dataUnit);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  };

  async function fetchType() {
    try {
      const res = await axios.get(
        'http://34.87.121.155:2121/apiwebpbi/api/package/type'
      );
      setDataType(res.data.data);
      console.log('datatype', dataType);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  useEffect(() => {
    fetchGate();
    fetchTower();
    fetchUnit();
    fetchCust();
    fetchType();
  }, [loading]);

  const progressSteps = {
    borderWidth: 3,
    activeStepIconBorderColor: themeColor,
    completedProgressBarColor: themeColor,
    activeStepIconColor: themeColor,
    activeLabelColor: themeColor,
    completedStepNumColor: themeColor,
    completedStepIconColor: themeColor,
    activeStepNumColor: textColor,
  };
  const progressStep = {
    nextBtnText: 'Next  >',
    previousBtnText: '<  Previous',
    finishBtnText: 'Submit',
    nextBtnStyle: styles.button,
    previousBtnStyle: styles.button,
    nextBtnTextStyle: styles.buttonText,
    previousBtnTextStyle: styles.buttonText,
  };
  const firstProgressStep = {
    ...progressStep,
    previousBtnStyle: {
      display: 'none',
    },
  };

  const [fileList, setFileList] = useState([]);
  const state = useMemo(() => ({ fileList }), [fileList]);

  const onSelectedImage = useCallback(
    (image) => {
      setFileList((fileList) => {
        const newDataImg = [...fileList];
        const source = { uri: image.path };
        const item = {
          id: Date.now(),
          url: source,
          content: image.data,
        };
        newDataImg.push(item);
        return newDataImg;
      });
    },
    [setFileList]
  );

  const takePhotoFromCamera = useCallback(() => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then((image) => {
      onSelectedImage(image);
      console.log('itemimage', image);
    });
  }, [onSelectedImage]);

  const choosePhotoFromLibrary = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then((image) => {
      onSelectedImage(image);
      console.log('gallery', image);
    });
  }, [onSelectedImage]);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View>
        <Image source={item.url} style={styles.imageBox} />
      </View>
    );
  }, []);

  const renderContent = () => {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          contentContainerStyle={styles.paddingSrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <ProgressSteps {...progressSteps}>
            <ProgressStep label='Step 1' {...firstProgressStep}>
              <View
                style={{
                  paddingHorizontal: 10,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SelectDropdown
                  data={dataGate}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  defaultButtonText={'Select Gate'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.gate_name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.gate_name;
                  }}
                  buttonStyle={styles.dropdown2BtnStyle}
                  buttonTextStyle={styles.dropdown2BtnTxtStyle}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#FFF'}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown2DropdownStyle}
                  rowStyle={styles.dropdown2RowStyle}
                  rowTextStyle={styles.dropdown2RowTxtStyle}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 10,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Picker
                  selectedValue={valueTower}
                  style={styles.dropdown2BtnStyle}
                  accessibilityLabel='Select'
                  onValueChange={(itemValue, itemIndex) =>
                    setValueTower(itemValue)
                  }>
                  <Picker.Item
                    label={'Select Tower'}
                    value={''}
                    enabled={false}
                  />
                  {dataTower.map((item, index) => {
                    return (
                      <Picker.Item
                        value={item.lot_type}
                        label={item.lot_type}
                        key={index}
                      />
                    );
                  })}
                </Picker>
              </View>
              <View
                style={{
                  paddingHorizontal: 10,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SelectDropdown
                  data={dataUnit}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setValueUnit(selectedItem, index);
                  }}
                  defaultButtonText={'Select Unit'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    setValueUnit(selectedItem, index);

                    return selectedItem.lot_no;
                  }}
                  rowTextForSelection={(item, index) => {
                    setValueUnit(item, index);

                    return item.lot_no;
                  }}
                  buttonStyle={styles.dropdown2BtnStyle}
                  buttonTextStyle={styles.dropdown2BtnTxtStyle}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#FFF'}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown2DropdownStyle}
                  rowStyle={styles.dropdown2RowStyle}
                  rowTextStyle={styles.dropdown2RowTxtStyle}
                />
              </View>
            </ProgressStep>
            <ProgressStep label='Step 2' {...progressStep}>
              <View
                style={{
                  paddingHorizontal: 10,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SelectDropdown
                  data={dataCust}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setValueCust(selectedItem, index);
                  }}
                  defaultButtonText={'Name Resident'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    setValueCust(selectedItem, index);

                    return selectedItem.member_name;
                  }}
                  rowTextForSelection={(item, index) => {
                    setValueCust(item, index);

                    return item.member_name;
                  }}
                  buttonStyle={styles.dropdown2BtnStyle}
                  buttonTextStyle={styles.dropdown2BtnTxtStyle}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#FFF'}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown2DropdownStyle}
                  rowStyle={styles.dropdown2RowStyle}
                  rowTextStyle={styles.dropdown2RowTxtStyle}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 50,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={[BaseStyle.textInput, { marginTop: 10 }]}
                  autoCorrect={false}
                  placeholder={t('Delivery Name')}
                  value={nameDelivery}
                  onChangeText={valueNameDelivery}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 50,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={[BaseStyle.textInput, { marginTop: 10 }]}
                  autoCorrect={false}
                  placeholder={t('Delivery HP')}
                  value={hpDelivery}
                  onChangeText={valueHpDelivery}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 50,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={[BaseStyle.textInput, { marginTop: 10 }]}
                  autoCorrect={false}
                  placeholder={t('Sender Name')}
                  value={nameSender}
                  onChangeText={valueSenderName}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 50,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={[BaseStyle.textInput, { marginTop: 10 }]}
                  autoCorrect={false}
                  placeholder={t('Sender HP')}
                  value={hpSender}
                  onChangeText={valueSenderHp}
                />
              </View>
            </ProgressStep>
            <ProgressStep label='Step 3' {...progressStep}>
              <View
                style={{
                  paddingHorizontal: 10,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SelectDropdown
                  data={dataType}
                  onSelect={(selectedItem, index) => {
                    console.log('item', selectedItem, index);
                    setValueTower(selectedItem);
                  }}
                  defaultButtonText={'Select Type'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.package_descs;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.package_descs;
                  }}
                  buttonStyle={styles.dropdown2BtnStyle}
                  buttonTextStyle={styles.dropdown2BtnTxtStyle}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#FFF'}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown2DropdownStyle}
                  rowStyle={styles.dropdown2RowStyle}
                  rowTextStyle={styles.dropdown2RowTxtStyle}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 50,
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={[BaseStyle.textInput, { marginTop: 10 }]}
                  autoCorrect={false}
                  placeholder={t('QTY')}
                  value={quantity}
                  onChangeText={valueQuantity}
                />
              </View>
              <View style={styles.container}>
                <FlatList
                  data={fileList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  extraData={state}
                />

                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={takePhotoFromCamera}>
                  <Text>Open Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={choosePhotoFromLibrary}>
                  <Text>Open Gallery</Text>
                </TouchableOpacity>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </ScrollView>
      </SafeAreaView>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  button: {
    backgroundColor: '#444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  textHeader: {
    fontSize: 36,
    marginBottom: 24,
    marginStart: 12,
    marginTop: 0,
    fontWeight: 'bold',
  },
  buttonText: {
    color: textColor,
    fontSize: 16,
  },
  inpt: {
    borderWidth: 2,
    borderColor: '#0b8ed2',
    borderRadius: 4,
    padding: 8,
    marginBottom: 15,
  },
  dropdown2BtnStyle: {
    width: '90%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: { backgroundColor: '#fff' },
  dropdown2RowStyle: { backgroundColor: '#fff', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
  },
  selectButtonContainer: {
    margin: 20,
    borderRadius: 5,
  },
  imageContainer: {
    marginVertical: 20,
    borderWidth: 5,
    borderColor: '#ff5555',
  },
  imageBox: {
    width: 256,
    height: 256,
  },
  selectButtonContainer: {
    margin: 20,
    borderRadius: 5,
  },
  selectButtonTitle: {
    padding: 10,
    fontSize: 18,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});

export default Package;
