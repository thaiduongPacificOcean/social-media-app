import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { router, Stack } from 'expo-router'
import { AuthContext, AuthContextProvider } from '../context/AuthContext'

const _layout = () => {
  return (
    <AuthContextProvider>
      <TabLayout />
    </AuthContextProvider>
  )
}
const TabLayout = () => {
  const { user } = useContext(AuthContext);
  console.log('user login', user);

  useEffect(() => {
    if (!user) {
      router.replace('welcome');
    }
  }, [user]);

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({
})