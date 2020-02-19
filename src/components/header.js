import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const Header = ({title, style}) => {
  return (
    <View style={[styles.header]}>
      {title && (
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View>
        <TouchableOpacity>
          <Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  box: {},
  title: {
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#3443',
  },
});
