import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { blurhash } from '../../helpers/common'
import { theme } from '../../constants/theme'
import DEFAULT_IMG from '../../utils/defaultImage'

const NotificationItem = ({ notification }) => {
  return (
    <View style={styles.container}>
      <View style={styles.notificationCard}>
        <View style={styles.right}>
          <Image style={styles.avatar}
            placeholder={blurhash}
            source={{ uri: notification ? notification.recipient.img : DEFAULT_IMG }}
            contentFit="cover"
            transition={1000}
          />
          <View>
            <Text style={styles.username}>{notification.recipient.username}</Text>
            <Text style={styles.text}>{notification.message}</Text>
          </View>
        </View>
        <Text style={styles.time}>1h ago</Text>
      </View>
    </View>
  )
}

export default NotificationItem

const styles = StyleSheet.create({
  container: {

  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  right: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  avatar: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    borderRadius: 10
  },
  username: {
    fontWeight: theme.fonts.bold
  },
  text: {
    color: theme.colors.text
  },
  time: {
    color: theme.colors.text,
    fontSize: 12
  }
})