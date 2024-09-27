import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import Input from '../components/Input'
import { hp, wp } from '../helpers/common'
import { useRouter } from 'expo-router'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import { AuthContext } from "../context/AuthContext"
import api from '../utils/api'

const login = () => {
    const router = useRouter();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const onSubmit = async () => {
        console.log("Credentials:", credentials); 
        dispatch({ type: "LOGIN_START" });
        try {

            const res = await api.post('/auth/login', credentials);

            console.log("Response:", res.data);

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            router.push('/(tabs)/home');
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response ? error.response.data : error.message });
            Alert.alert("Login Failed", error.response.data.message || "Invalid credentials. Please try again.");
        }
    }

    return (
        <ScreenWrapper>
            <StatusBar style='dark' />
            <View style={styles.container}>
                <BackButton/>
                <View>
                    <Text style={styles.welcomeText}>Hey</Text>
                    <Text style={styles.welcomeText}>Welcome Back</Text>
                </View>
                {/* Form */}
                <View style={styles.form}>
                    <Text style={styles.formTitle}>Please login to continue</Text>
                    <Input
                        icon={<Icon name="mail" size={26} stokeWidth={1.6} />}
                        placeholder="Enter your mail"
                        onChangeText={value => setCredentials(prev => ({ ...prev, email: value }))}
                    />
                    <Input
                        icon={<Icon name="lock" size={26} stokeWidth={1.6} />}
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={value => setCredentials(prev => ({ ...prev, password: value }))}
                    />
                    <Text style={styles.forgotPassword}>
                        Forgot Password
                    </Text>

                    <Button title='Login' loading={loading} onPress={onSubmit} />

                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.loginText}>Don't have an account ? </Text>
                        <Pressable onPress={() => router.push('signup')}>
                            <Text

                                style={[styles.loginText, { color: theme.colors.darkPrimary, fontWeight: theme.fonts.semibold }]}
                            >
                                Sign up
                            </Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </ScreenWrapper>
    )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 35,
        paddingHorizontal: wp(5),
    },
    welcomeText: {
        color: theme.colors.text,
        fontSize: hp(4),
        fontWeight: theme.fonts.extraBold
    },
    form: {
        gap: 25
    },
    formTitle: {
        fontSize: hp(1.5),
        color: theme.colors.text,
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
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