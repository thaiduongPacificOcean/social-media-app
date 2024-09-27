import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackButton from './BackButton'
import { theme } from '../constants/theme'

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30
  },
  titleText: {
    fontSize: 20,
    color: theme.colors.text,
    fontWeight: theme.fonts.semibold
  }
})