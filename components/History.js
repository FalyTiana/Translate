import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TranslationResult from './TranslationResult';
import colors from '../utils/colors';
import { useSelector } from 'react-redux';

export default function History() {
    const history = useSelector((state) => state.history.items);    
  return (
    <View style={styles.container}>
        <FlatList
          data={history.slice().reverse()}
          renderItem={(itemData) => {
            return <TranslationResult itemId={itemData.item.id} />;
          }}
        />
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.greyBackground,
        flex: 1,
        padding: 10,
      },
})