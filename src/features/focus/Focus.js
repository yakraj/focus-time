import React, {useState} from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';
import Constants from 'expo-constants';
import {TextInput} from 'react-native-paper'
import {RoundedButton} from '../../components/RoundedButton'
import {FontSize, PaddingSize} from '../../utils/sizes'
import {Colors} from '../../utils/colors'

export const Focus = ({addSubject}) => {
const[Subject, setSubject] = useState(null)
  return (
    <View style={styles.container}>
      <View style = {styles.innerContainer}>
      <Text style = {styles.title}> What would you like to focus on</Text>
      <View style = {styles.inputContainer}>
      <TextInput onSubmitEditing = {
          ({nativeEvent})=> {
            setSubject(nativeEvent.text)
          }
      } style = {{flex: 1,  marginRight: 10}}/>
       <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSubject(Subject);
            }}
          />
      </View>
      </View>
    </View>
  );
}
// css starts from here
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: Colors.darkblue
  }, innerContainer: {
    flex: 1,
    padding: PaddingSize.md,
    justifyContent: 'center'
  }, title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: FontSize.lg,

  },inputContainer: {
    paddingTop: PaddingSize.md,
    flexDirection: 'row', 
    alignItems: 'center'
  }
});
