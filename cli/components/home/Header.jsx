import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import Icon from '../../assets/icons'
import { useRouter } from 'expo-router'
import DEFAULT_IMG from '../../utils/defaultImage'

const Header = ({ user }) => {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Ocean</Text>
            <View style={styles.icons}>
                <Pressable onPress={() => { router.push('notification') }}>
                    <Icon name="mail" size={25} stokeWidth={1.6} />
                </Pressable>
                <Pressable onPress={() => { router.push('profile') }}>
                    <View style={styles.avatar}>
                        <Image
                            style={styles.img}
                            source={{ uri: user?.img ? user.img : DEFAULT_IMG }} />
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
    },
    avatar: {
        width: 30,
        height: 30,
        padding: 1,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: theme.colors.gray,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    }
})