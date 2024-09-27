import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { hp, wp } from '../../helpers/common'
import { blurhash } from '../../helpers/common';
import { theme } from '../../constants/theme';
import { Image } from 'expo-image'
import { AuthContext } from '../../context/AuthContext';

const HeaderChat = () => {
    const { user, dispatch } = useContext(AuthContext);

    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerTitle}>Chat</Text>
            </View>
            <View style={styles.avatar}>
                <Image
                    style={styles.image}
                    source={{ uri: user?.img ? user.img : 'https://i.ibb.co/MBtjqXQ/no-avatar.gif' }}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                />
            </View>
        </View>
    )
}

export default HeaderChat

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.primary,
        paddingTop: 30,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        paddingBottom: 10,
        paddingHorizontal: 20
    },
    headerTitle: {
        fontSize: 25,
        color: '#fff',
        fontWeight: theme.fonts.medium
    },
    avatar: {
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 25,
    }

})