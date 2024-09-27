import { StyleSheet, Text, View } from 'react-native'
import { Entypo, Feather, FontAwesome6 } from '@expo/vector-icons'
import React from 'react'
import { wp, hp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import BackButton from '../BackButton'

const HeaderProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <BackButton />
        <View style={styles.userInfo}>
          <Text style={styles.username}>Profile</Text>
        </View>
      </View>
      <View style={styles.icons}>
        <Feather name='bell' size={hp(2.8)} color={theme.colors.text} />
        <FontAwesome6 name='bars' size={hp(2.8)} color={theme.colors.text} />
      </View>
    </View>
  )
}

export default HeaderProfile

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: wp(5),
    borderBottomWidth: 1,
    borderColor: theme.colors.darkLight,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15
  },
  title: {
    flexDirection: 'row',
    gap: 20
  },
  username: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: theme.fonts.semibold
  },
  icons: {
    flexDirection: 'row',
    gap: 20
  }
})