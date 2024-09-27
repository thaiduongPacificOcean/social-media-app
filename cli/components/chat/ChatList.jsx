import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ChatItem from '../chat/ChatItem'
import { hp, wp } from '../../helpers/common'
import { AuthContext } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch'

const ChatList = () => {

  const { user, dispatch } = useContext(AuthContext);

  const { data, loading, error, reFetch } = useFetch(`/users`);

  return (
    <View style={styles.container}>
      {
        data?.map((userConversation, index) => (
          userConversation._id != user._id && (
            <ChatItem key={index} userConversation={userConversation} />
          )
        ))
      }
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({
  container: {
    gap: 30,
    paddingBottom: 20,
  }
})