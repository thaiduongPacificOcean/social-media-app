import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Loading from '../components/Loading'
import ScreenWrapper from '../components/ScreenWrapper'

const index = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <Loading />
      </View>
    </ScreenWrapper>
  )
}

export default index

const styles = StyleSheet.create({})