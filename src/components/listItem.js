import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';

const ListItem = ({data}) => {
  const Item = ({title}) => {
    console.log('TCL: Item -> title', title);
    return (
      <TouchableOpacity style={styles.boxBtn}>
        <Text style={styles.txtTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList data={data} renderItem={item => <Item title={item.item} />} />
  );
};

export default ListItem;

const styles = StyleSheet.create({
  boxBtn: {
    padding: 15,
  },
  txtTitle: {
    textAlign: 'center',
  },
});
