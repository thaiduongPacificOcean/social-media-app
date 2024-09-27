import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'
import { useRouter } from 'expo-router'

const BackButton = () => {
    const router = useRouter()
    return (
        <Pressable onPress={() => router.back()} style={styles.button}>
            <Icon name="arrowLeft" stokeWidth={2.5} size={26} color={theme.colors.text} />
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        borderRadius: theme.radius.sm,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
    }
})