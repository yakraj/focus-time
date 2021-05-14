import React, {useState} from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { Colors } from '../../utils/colors';
import {RoundedButton} from '../../components/RoundedButton'
import { Countdown } from '../../components/countdown';
import {ProgressBar} from 'react-native-paper'
import {Timing} from './Timing'
import {useKeepAwake} from 'expo-keep-awake'



export const Timer = ({ style = {}, textStyle = {}, size = 125, ...props }) => {

const DEFAULT_TIME = 0.1

  useKeepAwake();
  const [minutes, setminutes] = useState(DEFAULT_TIME)
  const [IsStarted, setIsStarted]  = useState(true)
  const [progress, setprogress] = useState(1)
  const onProgress = (progress) =>{
    setprogress(progress)
  }


const vibrate = () =>{
  if(Platform.OS === 'ios'){

      const interval = setInterval(() => Vibration.vibrate(), 1000)
      setTimeout(()=> clearInterval(interval), 10000)
  }else {
    Vibration.vibrate(3000)
  }
}

  const onEnd = () =>{
  vibrate()
  setminutes(DEFAULT_TIME)
  setprogress(1)
  setIsStarted(false)
  props.onTimerEnd()
  }

const changeTime = (min)=>{
  setminutes(min)
  setprogress(1)
  setIsStarted(false)
}

  return (
    <View style={styles.container}>
      <View style = {styles.countdown}>
        <Countdown onEnd ={onEnd} minutes = {minutes}  isPaused = {!IsStarted} onProgress = {onProgress}/>
      </View>
      <View>
        <Text style={styles.title}> Focusing On : </Text>
        <Text style={styles.task}> {props.focusSubject}</Text>
      </View> 
      <View style = {{paddingTop:10}}>
        <ProgressBar 
        progress = {progress}
          color ="#5E84E2"
          style = {{height: 10}}
        />
        </View>
        <View style = {styles.buttonWrapper}>
          <Timing onChangeTime={changeTime} />
        </View> 


          <View style={styles.buttonWrapper}>
        {IsStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      
        <View style= {styles.clearSubject}>
          <RoundedButton title="-" size = {50} onPress={() => props.clearSubject()} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  countdown:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: Colors.white,
    textAlign: 'center',
  },

  task: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },buttonWrapper :{
    flex: 0.3,
    flexDirection: 'row',
    padding:15,
    justifyContent:'center',
    alignItems: 'center'
  },clearSubject:{
    paddingBottom: 25,
    paddingLeft: 25
  }
});
