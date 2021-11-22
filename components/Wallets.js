import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Context}  from '../context/Store';


const Wallet = () =>  {
    const [state] = useContext(Context);
    return (
        <View style={styles.walletContainer}>
           {state.walletData.map(balance => {
               return (
                <View style={styles.wallet}>
                    <Text style={styles.fontBold}>{balance.wallet}</Text>
                    <Text>Balance {balance.symbol}{balance.balance}</Text>
                </View>
               )
           })}
      </View>
    )
}

const styles = StyleSheet.create({
  walletContainer:{
    flexDirection:"row",
    marginTop:50,
    justifyContent:"space-between",
    marginBottom:20
  },
  wallet:{
    borderWidth:0.5,
    borderColor:"#ccc",
    justifyContent:"center",
    alignItems:"center",
    padding:20,
    backgroundColor:"#fff"
  },
  fontBold:{
    fontWeight:"bold",
    fontSize:21
  },
})

export default Wallet;