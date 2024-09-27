import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Button from '../components/Button'
import { wp, hp } from '../helpers/common'
import { theme } from '../constants/theme'
import { useRouter } from 'expo-router'

const welcome = () => {
    const router = useRouter();
    const handlePress = () => {
        router.push('signup')
    }
    return (
        <ScreenWrapper bg="white">
            <StatusBar styles="dark" />
            <View style={styles.container}>
                <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcome.png')} />
                <View style={{ gap: 20 }}>
                    <Text style={styles.title}>Ocean.com</Text>
                    <Text style={styles.punchline}>Where every thought finds a home and every image tells a story</Text>
                </View>
                <View style={styles.footer}>
                    <Button
                        title='Getting Started'
                        buttonStyle={{ marginHorizontal: wp(3) }}
                        onPress={handlePress}
                    />
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.loginText}>Already have an account ? </Text>
                        <Pressable onPress={() => router.push('login')}>
                            <Text

                                style={[styles.loginText, { color: theme.colors.darkPrimary, fontWeight: theme.fonts.semibold }]}
                            >
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: wp(4)
    },
    welcomeImage: {
        width: wp(100),
        height: hp(30),
        alignSelf: 'center'
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },
    punchline: {
        color: theme.colors.text,
        paddingHorizontal: wp(10),
        fontSize: hp(1.7),
        textAlign: 'center'
    },
    footer: {
        width: '100%',
        gap: 30
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    loginText: {
        color: theme.colors.text,
        fontSize: hp(1.6),
        textAlign: 'center'
    }

})