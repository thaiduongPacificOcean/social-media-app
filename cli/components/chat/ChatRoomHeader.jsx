import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { theme } from '../../constants/theme';
import { useRouter } from 'expo-router'
import { hp, wp } from '../../helpers/common';
import { Image } from 'expo-image';
import BackButton from '../../components/BackButton'
import { AuthContext } from '../../context/AuthContext';
import DEFAULT_IMG from '../../utils/defaultImage';

const ChatRoomHeader = ({ userConversationID, userConversationAvatar, userConversationUsername }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerLeft}>
                <BackButton />
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: userConversationAvatar ? userConversationAvatar : DEFAULT_IMG }}
                        style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                    />
                    <Text style={styles.username}>{userConversationUsername}</Text>
                </View>
            </View>
            <View style={styles.headerRight}>
                <View style={styles.icons}>
                    <Ionicons name='call' size={hp(2.8)} color={theme.colors.text} />
                    <Ionicons name='videocam' size={hp(2.8)} color={theme.colors.text} />
                </View>
            </View>
        </View>
    )
}

export default ChatRoomHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: wp(5),
        borderBottomWidth: 1,
        borderColor: theme.colors.darkLight,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    headerLeft: {
        flexDirection: 'row',
        gap: 30
    },
    headerRight: {
        flexDirection: 'row',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15
    },
    image: {

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