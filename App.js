/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';
import ExchangeForm from './components/ExchangeForm';
import Wallet from './components/Wallets';
import Store from './context/Store';

const App = () =>  {
  return (
    <Store>
        <View style={styles.container}>
          <Wallet/>
          <ExchangeForm/>
        </View>
    </Store>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:"#f1f1f1",
    paddingHorizontal:"4%"
  }
});

export default App;
