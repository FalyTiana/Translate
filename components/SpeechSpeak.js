import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';


export default function SpeechSpeak({text, code}) {
  
  const [isLogin, setIsLogin] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speak = () => {
    setIsLogin(true)
    Speech.speak(text, {
      language: code, 
      onStart:()=> {setIsLogin(false); setIsSpeaking(true)},
      onDone: ()=> setIsSpeaking(false),
      onError: ()=>setIsLogin(false)
    });
  };
  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  return (
    <TouchableOpacity disabled={!text.trim()} style={styles.container} onPress={isSpeaking?stopSpeaking : speak }>
      {isLogin? <ActivityIndicator size={"small"} color={colors.lightGrey}/> :<Ionicons name={isSpeaking? "stop" : "volume-medium-outline" } size={24} color={text.trim() && !isSpeaking? colors.primary : colors.lightGrey} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    left: 5,
    bottom: 5,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 5
  }
})