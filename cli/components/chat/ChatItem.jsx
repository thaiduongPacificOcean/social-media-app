import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { hp, wp } from '../../helpers/common'
import { Image } from 'expo-image'
import { blurhash } from '../../helpers/common';
import { theme } from '../../constants/theme';
import { useRouter } from 'expo-router'
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api'
import DEFAULT_IMG from '../../utils/defaultImage';
import useFetch from '../../hooks/useFetch';
import { formatDate } from '../../utils/common';

const ChatItem = ({ userConversation }) => {

  const router = useRouter();
  const { user, dispatch } = useContext(AuthContext);
  const [lastMessage, setLastMessage] = useState('');

  // Get last message
  const { data, loading, error, reFetch } = useFetch(`/chats/getLastMessages/${user._id}/${userConversation._id}`);
  useEffect(() => {
    if (data && data.length > 0) {
      setLastMessage(data[0].lastMessage);
    }
  }, [data]);
  
  const renderTime = () => {
    if (lastMessage) {
      const date = new Date(lastMessage.createdAt);
      return formatDate(date);
    }
  }

  const renderLastMessage = () => {
    if (lastMessage) {
      if (user._id == lastMessage?.sender._id) return "You: " + lastMessage?.text;
      return lastMessage?.text;
    } else {
      return 'Say hi 👋'; // Nếu chưa nhắn tin cho nhau lần nào
    }
  }



  const openChatRoom = async () => {
    console.log('User Id 1:', user._id);
    console.log('User Id 2:', userConversation._id);

    const userConversationID = userConversation._id;
    const userConversationUsername = userConversation.username;
    const userConversationAvatar = userConversation.img;

    console.log("User Conversation ID : ", userConversationID);

    try {
      const newConversation = {
        userId1: user._id,
        userId2: userConversationID
      };
      await api.post("/chats/createConversation", newConversation);

      router.push({
        pathname: '/chatRoom',
        params: { userConversationID, userConversationUsername, userConversationAvatar }
      });

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <TouchableOpacity onPress={openChatRoom}>
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={{ uri: userConversation?.img ? userConversation.img : DEFAULT_IMG }}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
        />
        <View style={styles.itemText}>
          <View style={styles.textGroup}>
            <Text style={styles.username}>{userConversation?.username}</Text>
            <Text style={styles.time}>{renderTime()}</Text>
          </View>
          <Text style={styles.lastMessage}>{renderLastMessage()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ChatItem

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 25
  },
  itemText: {
    flex: 1,
    gap: 12
  },
  textGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    fontSize: hp(1.8),
    fontWeight: theme.fonts.medium
  },
  time: {
    fontSize: hp(1.2),
    color: theme.colors.text
  },
  lastMessage: {
    fontSize: hp(1.4),
    color: theme.colors.text
  },

})