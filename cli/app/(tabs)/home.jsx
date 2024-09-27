import { Button, FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { hp, wp } from '../../helpers/common'
import { AuthContext } from '../../context/AuthContext'
import Header from '../../components/home/Header'
import Story from '../../components/home/Story'
import Post from '../../components/home/Post'
import PostForm from '../../components/home/PostForm'
import useFetch from '../../hooks/useFetch'

const home = () => {

  const { user, dispatch } = useContext(AuthContext);

  console.log("user", user);

  const { data, loading, error, reFetch } = useFetch(`/posts/getPosts`);

  return (
    <View style={styles.wrapperContainer}>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <Header user={user} />
        <Story />
        <PostForm />
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.postContainer}
          keyExtractor={item => item._id.toString()}
          renderItem={({ item }) => <Post item={item} reFetch={reFetch} />}
        />
      </View>
    </View>
  )
}

export default home

const styles = StyleSheet.create({
  wrapperContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
    gap: 10
  },
  container: {
    gap: 10,
    flex: 1
  },
  postContainer: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
})