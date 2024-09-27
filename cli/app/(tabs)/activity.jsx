import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'
import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthContext } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/api'
import DEFAULT_IMG from '../../utils/defaultImage';

const activity = () => {

  const { user, dispatch } = useContext(AuthContext);
  const { data, loading, error, reFetch } = useFetch(`/users`);

  const handleFollow = async (userId) => {
    const isFollowing = user.following.includes(userId);
    console.log("Check Follow ", isFollowing);
    try {
      await api.put(`/users/follow/${userId}/${user._id}`);
      reFetch();
      const updateUser = await api.put(`/users/${user._id}`);

      dispatch({ type: "UPDATE_USER", payload: updateUser.data });

    } catch (error) {
      console.log("HANDLE FOLLOW : ", error);
    }
  }


  return (
    <ScreenWrapper bg={'white'}>
      <View style={styles.container}>
        <Header title={'Activity'} />
        <View>
          <Text style={styles.title}>Suggestions for you</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.suggestions}>
          {
            data && data.map((userSuggestion, index) => (
              userSuggestion._id != user._id && (
                <View style={styles.card} key={index}>
                  <View style={styles.userInfor}>
                    <Image
                      source={{ uri: userSuggestion.img ? userSuggestion?.img : DEFAULT_IMG }}
                      style={styles.userImage}
                    />
                    <View>
                      <Text style={styles.username}>{userSuggestion.username}</Text>
                      <Text style={styles.subtitle}>for you</Text>
                    </View>
                  </View>
                  <View style={styles.button}>
                    {
                      user.following.includes(userSuggestion._id) ?
                        <>
                          <TouchableOpacity onPress={() => handleFollow(userSuggestion._id)}>
                            <View style={styles.followingButton}>
                              <Text style={styles.followingButtonText}>Following</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View>
                              <AntDesign name="close" size={18} color={theme.colors.text} />
                            </View>
                          </TouchableOpacity>
                        </>
                        :
                        <>
                          <TouchableOpacity onPress={() => handleFollow(userSuggestion._id)} >
                            <View style={styles.followButton}>
                              <Text style={styles.followButtonText}>Follow</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View>
                              <AntDesign name="close" size={18} color={theme.colors.text} />
                            </View>
                          </TouchableOpacity>
                        </>
                    }
                  </View>
                </View>
              )
            ))
          }
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default activity

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 18
  },
  title: {
    fontSize: 15,
    fontWeight: theme.fonts.semibold,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  userInfor: {
    flexDirection: 'row',
    gap: 10
  },
  userImage: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    borderRadius: 25
  },
  username: {
    color: theme.colors.text,
    fontWeight: theme.fonts.bold
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.text
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  followButton: {
    padding: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 7
  },
  followButtonText: {
    color: 'white'
  },
  followingButton: {
    padding: 8,
    backgroundColor: theme.colors.text,
    borderRadius: 7
  },
  followingButtonText: {
    color: 'white'
  }
})