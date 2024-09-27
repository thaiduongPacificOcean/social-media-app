import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatRoomHeader from '../components/chat/ChatRoomHeader'
import { hp, wp } from '../helpers/common'
import { Feather } from '@expo/vector-icons'
import MessageList from '../components/chat/MessageList'
import CustomKeyboardView from '../components/CustomKeyboardView'
import Icon from '../assets/icons'
import api from '../utils/api'
import { AuthContext } from '../context/AuthContext'
import { useLocalSearchParams } from 'expo-router';
import useFetch from '../hooks/useFetch'

const chatRoom = () => {

  const params = useLocalSearchParams();

  const { userConversationID, userConversationUsername, userConversationAvatar } = params;

  const { user, dispatch } = useContext(AuthContext);

  const { data: conversationData } = useFetch(`/chats/getConversationsByUserId/${user._id}/${userConversationID}`);

  const textRef = useRef('');
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);
  
  const [messages, setMessages] = useState([]);

  console.log("data from Chat room (getConversationsByUserId) : ", conversationData)

  const conversationID = Array.isArray(conversationData) && conversationData.length > 0 ? conversationData[0]._id : null;

  console.log("Conversation ID:", conversationID);


  const fetchMessages = async () => {
    try {
      const response = await api.get(`/chats/getMessagesByConversationId/${conversationID}`);
      setMessages(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (conversationID) {
      fetchMessages();
    }
  }, [conversationID]);

  const send = async () => {
    try {
      const newMesage = {
        conversationId: conversationID,
        text: textRef.current,
        senderId: user._id
      }
      await api.post("/chats/sendMessage", newMesage);

      textRef.current = "";
      if (inputRef) {
        inputRef?.current?.clear();
      }
      fetchMessages();


    } catch (error) {
      console('Send : ', error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ChatRoomHeader
        userConversationID={userConversationID}
        userConversationAvatar={userConversationAvatar}
        userConversationUsername={userConversationUsername}
      />
      <View style={styles.messageContainer}>
        <View style={styles.messageList}>
          <MessageList conversationID={conversationID} messages={messages} />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottom} >
            <TouchableOpacity>
              <View style={styles.send}>
                <Icon name="image" size={20} stokeWidth={1.6} />
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder='Type Message'
              onChangeText={value => textRef.current = value}
              ref={inputRef}
              style={styles.inputText}
            />
            <TouchableOpacity onPress={send}>
              <View style={styles.send}>
                <Feather name='send' size={hp(2.7)} color={'#737373'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default chatRoom

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    paddingHorizontal: wp(5),
    flex: 1,
    justifyContent: 'space-between'
  },
  bottomContainer: {
    paddingTop: 10,
    marginBottom: hp(1.7)
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 999,
    padding: 8,
    marginVertical: 12
  },
  send: {
    marginRight: 1,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    padding: 8
  },
  inputText: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 10
  }

})