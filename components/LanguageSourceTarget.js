import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import colors from '../utils/colors'

export default function LanguageSourceTarget({ from, to, switchLanguages, props }) {
  return (
    <View style={styles.Container}>
            <TouchableOpacity style={styles.Option} onPress={() =>
            props.navigation.navigate("languageSelect", {
              title: "Translate from",
              selected: from.code,
              mode: "From",
            })
          }>
                <Text style={styles.OptionText}>{from.language}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowContenaire} disabled={from.code === "auto"} onPress={()=>switchLanguages(to, from)}>
                <FontAwesome6 name="arrow-right-arrow-left" size={18} color={from.code === "auto"? colors.lightGrey: colors.primaryDisabled} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.Option} onPress={() =>
            props.navigation.navigate("languageSelect", {
              title: "Translate to",
              selected: to.code,
              mode: "to",
            })
          }>
                <Text style={styles.OptionText}>{to.language}</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: "row",
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
      },
      Option: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
      },
      arrowContenaire: {
        width: 50,
        alignItems: "center",
        justifyContent: "center",
      },
      OptionText: {
        color: colors.primary,
        fontFamily: "regular",
        letterSpacing: 0.3,
      },
})