import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {apiSearch, addNameCart, getName, deleteName} from '../API/api';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal, {ModalContent} from 'react-native-modals';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';

const Home = props => {
  //const data = ['Audi q8', 'gls 450', 'Mec', 'Audi Q5', 'range rover 2020'];
  const {navigate} = props.navigation;
  const [nameCar, setName] = useState();
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  console.log('TCL: visible', visible);
  const [isLoad, setIsLoad] = useState(false);
  const [nameA, setNameA] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getName().then(value => {
      console.log('TCL: value', value);
      const Data = [];
      value.docs.map(data => {
        console.log('TCL: data', data.data());
        Data.push(data.data());
      });
      setData(Data);
    });
  });

  const onNext = name => {
    console.log('TCL: name', name);
    let Name = name.trim();
    let url = apiSearch + Name;

    navigate('WebConnect', url);
  };

  const onEdit = name => {
    // console.log('id', getID());
    setNameA(name);
    setVisible(!visible);
  };

  const onDelete = () => {
    deleteName();
    // console.log('id', getID());
  };
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100, 100, 101],
      outputRange: [0, 0, 0, 0],
    });

    return (
      <RectButton style={styles.rightAction}>
        <TouchableOpacity
          onPress={() => onDelete()}
          style={[
            styles.actionText,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          <Icon name={'delete'} size={20} color={'#FFF'} />
        </TouchableOpacity>
      </RectButton>
    );
  };

  const Item = ({name, index}) => {
    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity
          style={[
            styles.boxBtn(index),
            // {backgroundColor: index % 2 === 0 ? '#ABEEBF' : '#EEC2AB'},
          ]}
          onPress={() => onNext(name)}>
          <View>
            <Text style={styles.txtTitle}>{name}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => onEdit(name)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 20,
              }}>
              <Icon name={'edit'} size={30} color={'#CDCDCD'} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const onAdd = () => {
    console.log('name', nameCar);
    //let add = {nameCar};
    if (nameCar === '') {
      Alert.alert('chua nhap ten xe');
    } else {
      addNameCart(nameCar);
      setName('');
      setTimeout(() => {
        setRefreshing(false);
      }, 100);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(function() {
      setRefreshing(false);
    }, 100);
  };
  return (
    <SafeAreaView>
      <Text style={{padding: 10, fontSize: 17, fontWeight: 'bold'}}>
        Nhập tên xe
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 30,
        }}>
        <TextInput
          placeholder={'Nhập tên xe'}
          value={nameCar}
          onChangeText={text => setName(text)}
          style={{
            borderColor: '#CDCDCD',
            borderWidth: 1,
            borderRadius: 5,
            width: '70%',
            paddingHorizontal: 10,
          }}
        />
        <TouchableOpacity
          onPress={onAdd}
          style={{borderRadius: 5, backgroundColor: '#389FF5', padding: 10}}>
          <Text>Thêm xe</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#9BF4C9',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 30,
        }}>
        <Text style={{fontSize: 20, alignSelf: 'center', padding: 20}}>
          Danh sách tên các hãng xe
        </Text>
      </View>
      <ScrollView>
        <FlatList
          style={{paddingTop: 10}}
          data={data}
          renderItem={({item, index}) => (
            <Item name={item.name} index={index} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
        />
      </ScrollView>
      <Modal visible={visible}>
        <ModalContent>
          <View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                {'Sửa tên'}
              </Text>
            </View>
            <TextInput
              defaultValue={nameA}
              style={{
                width: 200,
                borderWidth: 1,
                borderColor: '#CDCDCD',
                marginVertical: 10,
                padding: 7,
                borderRadius: 7,
                height: 40,
              }}
            />
            <TouchableOpacity
              onPress={() => onEdit()}
              style={{
                padding: 10,
                backgroundColor: 'red',
                alignItems: 'center',
                borderRadius: 7,
              }}>
              <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                {'Lưu'}
              </Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  // boxBtn1: {
  //   padding: 15,
  //   // borderBottomColor: '#CDCDCD',
  //   // borderBottomWidth: 1,
  //   marginVertical: 10,
  //   borderRadius: 20,
  //   marginHorizontal: 20,
  // },
  txtTitle: {
    textAlign: 'center',
    color: '#000000',
  },
  boxBtn: index => ({
    padding: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3,
    borderRadius: 10,
    marginHorizontal: 10,
  }),
  rightAction: {
    // height: '100%',
    padding: 0,
    justifyContent: 'center',
    marginVertical: 4,
    backgroundColor: 'red',
    paddingHorizontal: 10,
    borderRadius: 7,
    marginLeft: -7,
  },
});
