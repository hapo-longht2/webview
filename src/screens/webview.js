import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import WebView from 'react-native-webview';
import Modal, {ModalContent} from 'react-native-modals';
import Icon from 'react-native-vector-icons/Ionicons';
const WebConnect = props => {
  const url = props.navigation.state.params;
  console.log('TCL: url', url);
  const web = useRef();
  const [url1, setUrl1] = useState();
  const [heart, setHeart] = useState(false);
  const [visible, setVisible] = useState(false);

  const onBack = () => {
    console.log('ok back', url1, url);

    if (url1 === url) {
      props.navigation.goBack();
    } else {
      web.current.goBack();
    }
  };

  const onHeart = () => {
    if (!heart) {
      setHeart(!heart);
      setVisible(true);
    }

    setHeart(!heart);
  };

  const onSave = () => {
    setVisible(!visible);
  };

  const _onNavigationStateChange = webViewState => {
    let geturl = webViewState.url.replace(/%20/g, ' ');
    console.log('TCL: geturl', geturl);
    setUrl1(geturl);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => onBack()}
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
          <Icon name={'ios-arrow-round-back'} size={35} color={'#1A95EA'} />
          {/* <Text style={{color: '#1A95EA', paddingLeft: 10}}>Back to</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onHeart()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 20,
          }}>
          <Icon
            name={'ios-heart'}
            size={26}
            color={heart === false ? '#C2C4C6' : '#F03813'}
          />
          {/* <Text style={{color: '#1A95EA', paddingLeft: 10}}>Back to</Text> */}
        </TouchableOpacity>
      </View>
      <WebView
        ref={web}
        source={{uri: url}}
        onNavigationStateChange={_onNavigationStateChange.bind(this)}
      />
      <Modal visible={visible}>
        <ModalContent>
          <View style={{width: 200}}>
            <Text>{'Tên cần lưu'}</Text>
            <TextInput
              placeholder={'Nhập tên cần lưu'}
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: '#CDCDCD',
                borderRadius: 10,
                marginVertical: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => onSave()}
              style={{
                backgroundColor: '#3AD769',
                borderRadius: 20,
                alignItems: 'center',
                padding: 10,
              }}>
              <Text>{'Lưu'}</Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
};

export default WebConnect;
