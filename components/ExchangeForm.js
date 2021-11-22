import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Context}  from '../context/Store';


const ExchangeForm = () =>  {

    const [state, dispatch] = useContext(Context);

    const currencies = ["USD", "EUR", "GBP"]
    const BASE_URL = 'https://v6.exchangerate-api.com/v6';
    const API_KEY = "99bc9f1355a187fe382a8137";

    const [fromCurrency, setFromCurrency] = useState(currencies[0]);
    const [toCurrency, setToCurrency] = useState(currencies[1]);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [fromAmount, setFromAmount] = useState();
    const [toAmount, setToAmount] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        if(fromCurrency != null && toCurrency != null) {
          fetch(`${BASE_URL}/${API_KEY}/pair/${fromCurrency}/${toCurrency}`)
          .then(res => res.json())
          .then(data => {
            setExchangeRate(data.conversion_rate);
          })
        }
    }, [fromCurrency, toCurrency])


    const handleChangeAmountFrom = (fromAmount)=>{
        setFromAmount(fromAmount);
        setError("");

        let obj = state.walletData.find(o => o.wallet === fromCurrency);

        if(fromAmount > obj.balance){
           setError("Exceeds Balance");
        }

        var convertedAmount = Math.floor(fromAmount * exchangeRate);
        setToAmount(convertedAmount.toString());
    }

    const handleChangeAmountTo = (toAmount)=>{
        setToAmount(toAmount);
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);

        setError("");

        let obj = state.walletData.find(o => o.wallet === toCurrency);

        if(toAmount > obj.balance){
           setError("Amount Exceeded");
        }
        var convertedAmount = Math.floor(toAmount * exchangeRate);
        setFromAmount(convertedAmount.toString());
    }

    const updateBalances = (walletFrom, amountFrom, walletTo, amountTo) => {
        //update wallets
        let balances = state.walletData;
        let walletFromValues = balances.findIndex(o => o.wallet === walletFrom);
        let walletToValues = balances.findIndex(o => o.wallet === walletTo);

        balances[walletFromValues].balance = parseFloat(balances[walletFromValues].balance) - parseFloat(amountFrom);
        balances[walletToValues].balance =  parseFloat(balances[walletToValues].balance) + parseFloat(amountTo);
       
        dispatch({type:"OVERRIDE",key:"walletData", payload:balances});
        setFromAmount("");
        setToAmount("");
    }


    const handleUpdateBalances = () =>{
        let obj = state.walletData.find(o => o.wallet === fromCurrency);
        if(toAmount > obj.balance && obj.balance >= 0){
            setError("Amount Exceeded");
         }
         updateBalances(fromCurrency, fromAmount, toCurrency, toAmount);
    }

    return (
        <View style={{padding:25, backgroundColor:"#fff"}}>
            <Text>Select currencies to convert</Text>

            {error != "" &&
               <Text style={{color:"red",backgroundColor:"#ccc",padding:10, textAlign:"center"}}>{error}</Text>
            }     

            <View style={styles.conWrapper}>
                <SelectDropdown
                data={currencies}
                onSelect={(selectedItem, index) => {
                    setFromCurrency(selectedItem)
                    setFromAmount(0)
                    setToAmount(0)
                }}
                
                defaultValueByIndex={0}
                buttonStyle={{width:100}}
                renderDropdownIcon={() => {
                return (
                    <FontAwesome name="chevron-down" color={"#444"} size={18} />
                );
                }}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={fromAmount}
                    onChangeText={fromAmount => handleChangeAmountFrom(fromAmount)}
                />
                <FontAwesome style={{position:"absolute", right:10, top:"30%"}} name="minus" color={"#ccc"} size={23} />
            </View>
            <View style={styles.conWrapper}>
                <SelectDropdown
                data={currencies}
                buttonStyle={{width:100}}
                onSelect={(selectedItem, index) => {
                    setToCurrency(selectedItem)
                    setFromAmount(0)
                    setToAmount(0)
                }}
                defaultValueByIndex={1}
                renderDropdownIcon={() => {
                return (
                    <FontAwesome name="chevron-down" color={"#444"} size={18} />
                );
                }}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={toAmount}
                    onChangeText={toAmount => handleChangeAmountTo(toAmount)}
                />
                <FontAwesome style={{position:"absolute", right:10, top:"30%"}} name="plus" color={"#ccc"} size={23} />
            </View>
            <View style={styles.exchangeRate}>
                 <Text>1 {fromCurrency} = {exchangeRate} {toCurrency} </Text>
            </View>

            <TouchableOpacity onPress={() => handleUpdateBalances()}>
                <View style={styles.btn}>
                    <Text style={[styles.fontBold,{textAlign:"center"}]}>Convert</Text>
                </View>
            </TouchableOpacity>
        </View>
    )};


    const styles = StyleSheet.create({
        btn:{
            width:200,
            marginTop:30,
            borderWidth:0.5,
            borderColor:"#ccc",
            padding:10,
            backgroundColor:"#ccc",
            textAlign:"center",
            alignSelf:"center",
            justifyContent:"center",
            borderRadius:10
          },
          fontBold:{
            fontWeight:"bold"
          },
          conWrapper:{
              marginTop:10,
              flexDirection:"row",
              justifyContent:"space-between"
          },
          exchangeRate:{
              marginTop:15,
              padding:10,
              alignItems:"center"
          },
          input:{
              borderWidth:0.5,
              borderColor:"#ccc",
              flex:1,
              fontWeight:"bold",
              fontSize:19,
              paddingHorizontal:15
          },
          errorText:{
            color:"#fff",backgroundColor:"#f00",padding:10,marginVertical:15, textAlign:"center"
          }
    })

    export default ExchangeForm;