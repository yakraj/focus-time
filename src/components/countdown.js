import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Text , StyleSheet} from 'react-native'
import {Colors} from '../utils/colors'
import {FontSize, PaddingSize} from '../utils/sizes'





const MinutsToMillis = (min)=> min*1000*60
const FormatTime = (time) => time < 10 ? `0${time}` : time
export const Countdown = ({
  minutes = 1,
  isPaused,
  onProgress,
  onEnd
}) => {
const interval = React.useRef(null)
const countDown = () => {
  setmillis((time) => {
    if(time === 0){
      clearInterval(interval.current)
      onEnd()
       return time
    }
    const timeLeft = time - 1000;

    return timeLeft

  })
}
const [millis, setmillis] = useState(null);

useEffect(()=>{
 
      onProgress(millis / MinutsToMillis(minutes))
    if(millis === 0){
      onEnd()
    }
    console.log(millis)
},[millis])

useEffect(()=> {
    if(isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }
    
    interval.current = setInterval(countDown, 1000);
},[isPaused])


const minute = Math.floor(millis/1000/60) % 60;

const second = Math.floor(millis/1000) % 60;

useEffect(()=>{
setmillis(MinutsToMillis(minutes))

},[minutes])

  return(
<Text style = {styles.text}>{FormatTime(minute)}:{FormatTime(second)}</Text>
  )

}

const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.white,
    padding: PaddingSize.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    
      }
}) 