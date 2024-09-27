import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MessageItem from '../chat/MessageItem'
import api from '../../utils/api'
import useFetch from '../../hooks/useFetch'

const MessageList = ({ conversationID, messages }) => {


    // const { data : messages , loading, error, reFetch } = useFetch(`/chats/getMessagesByConversationId/${conversationID}`);

    console.log(" converssationID : ", conversationID)
    console.log(" Messages : ", messages)

    return (
        <View style={styles.item}>
            {messages && messages?.map((message, index) => (
                <MessageItem key={index} message={message} />
            ))}
        </View>
    )
}

export default MessageList

const styles = StyleSheet.create({
    item: {
        paddingTop: 10,
        gap: 10
    }
})