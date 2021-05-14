import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/focusHistory';

import { Timer } from './src/features/timer/timer';
import { PaddingSize, FontSize } from './src/utils/sizes';

export default function App() {
  const [focusHistory, setfocusHistory] = useState([]);
  const [focusSubject, setfocusSubject] = useState(null);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setfocusHistory([...focusHistory, {key: String(focusHistory.length+1), subject, status }]);
  };

  const onClear = () => {
    setfocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setfocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);


  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const STATUS = {
    COMPLETE: 1,
    CANCELLED: 2,
  };

  useEffect(() => {
    if (focusSubject) {
      setfocusHistory([...focusHistory, focusSubject]);
    }
  }, [focusSubject]);

  console.log(focusHistory);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.COMPLETE);
            setfocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.CANCELLED);
            setfocusSubject(null);
          }}
        />
      ) : (
        <View style= {{flex: 0.5}}>
          <Focus addSubject={setfocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? PaddingSize.md : PaddingSize.lg,
    backgroundColor: '#252250',
  },
});
