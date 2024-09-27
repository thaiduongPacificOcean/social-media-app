import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'

const Avatar = ({uri}) => {
  return (
    <View style={styles.avatar}>
      <Image source={uri ? uri : ''} />
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({})