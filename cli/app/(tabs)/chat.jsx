import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import HeaderChat from '../../components/chat/HeaderChat';
import ChatList from '../../components/chat/ChatList';
import { hp, wp } from '../../helpers/common';
import SearchForm from '../../components/chat/SearchForm';
import Story from '../../components/chat/Story';
import { AuthContext } from '../../context/AuthContext';

const chat = () => {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <HeaderChat />
      <View style={styles.chatContainer}>
        <Story />
        <SearchForm />
        <ChatList />
      </View>
    </View>
  )
}

export default chat

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: '#fff',
  },
  chatContainer: {
    paddingHorizontal: wp(5),
  }

})