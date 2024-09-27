import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import Input from '../components/Input'
import { hp, wp } from '../helpers/common'
import { useRouter } from 'expo-router'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'

const signup = () => {
  const router = useRouter();

  const emailRef = useRef("")
  const usernameRef = useRef("")
  const passwordRef = useRef("")

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign up', "please fill all the fields !")
      return;
    }
  }

  return (
    <ScreenWrapper>
      <StatusBar styles='dark' />
      <View style={styles.container}>
        <BackButton router={router} />
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Please fill the details to create account</Text>
          <Input
            icon={<Icon name="mail" size={26} stokeWidth={1.6} />}
            placeholder="Enter your mail"
            onChangeText={value => emailRef.current = value}
          />
          <Input
            icon={<Icon name="user" size={26} stokeWidth={1.6} />}
            placeholder="Enter your username"
            onChangeText={value => usernameRef.current = value}
          />
          <Input
            icon={<Icon name="lock" size={26} stokeWidth={1.6} />}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={value => passwordRef.current = value}
          />

          <Button title='Sign up' loading={loading} onPress={onSubmit} />

          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Do you have an account ? </Text>
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

export default signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 35,
    paddingHorizontal: wp(5)
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