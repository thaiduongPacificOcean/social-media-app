import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import { AuthContext } from '../../context/AuthContext'

const MessageItem = ({ message }) => {
  const { user, dispatch } = useContext(AuthContext);

  return (
    <View style={{ gap: 10 }}>
      {
        message.sender._id == user._id ?
          <View style={styles.sender}>
            <View style={styles.messageSender}>
              <Text style={styles.textSender}>{message.text}</Text>
            </View>
          </View> 
          :
          <View style={styles.receiver}>
            <View style={styles.messageRecevier}>
              <Text style={styles.textReceiver}>{message.text}</Text>
            </View>
          </View>
      }


    </View>
  )
}

export default MessageItem

const styles = StyleSheet.create({
  sender: {
    alignItems: 'flex-end',
    marginRight: wp(3),
  },
  receiver: {
    alignItems: 'flex-start',
    marginLeft: wp(3),
  },
  messageRecevier: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  messageSender: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  textSender: {
    fontSize: hp(1.9)
  },
  textReceiver: {
    color: '#fff'
  }
})