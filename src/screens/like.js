import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let data = [
  {
    name: 'audi q6',
    url: 'https://giaxeoto.vn/gia-xe-audi-165',
    heart: true,
  },
  {
    name: 'audi q7',
    url: 'https://giaxeoto.vn/gia-xe-audi-165',
    heart: true,
  },
  {
    name: 'lambo',
    url: 'https://giaxeoto.vn/gia-xe-audi-165',
    heart: true,
  },
];
console.log('TCL: data', data);

const Like = props => {
  const {navigate} = props.navigation;
  const [data1, setData] = useState(data);

  const onDelete = item => {};

  const Item = ({item, index}) => {
    console.log('heart', item.heart);

    return (
      <TouchableOpacity
        style={[styles.boxBtn(index)]}
        onPress={() => navigate('WebConnect', item.url)}>
        <View>
          <Text style={styles.txtTitle}>{item.name}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => onDelete()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 20,
            }}>
            <Icon name={'ios-trash'} size={30} color={'#CDCDCD'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{alignItems: 'center', backgroundColor: '#13A0F0', padding: 12}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF'}}>
          {'Yêu thích'}
        </Text>
      </View>
      <FlatList
        data={data1}
        renderItem={({item, index}) => <Item index={index} item={item} />}
      />
    </SafeAreaView>
  );
};

export default Like;

const styles = StyleSheet.create({
  boxBtn: index => ({
    padding: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  }),
  txtTitle: {
    textAlign: 'center',
    color: '#000000',
  },
});
