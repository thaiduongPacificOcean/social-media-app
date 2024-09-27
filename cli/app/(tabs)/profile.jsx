import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { blurhash, wp } from '../../helpers/common'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import HeaderProfile from '../../components/profile/HeaderProfile'
import { Image } from 'expo-image'
import { theme } from '../../constants/theme'
import api from '../../utils/api'

const profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [filter, setFilter] = useState("featured");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (filterType) => {
    try {
      let response;
      switch (filterType) {
        case "featured":
          response = await api.get(`/posts/getPostbyUserId/${user._id}`);
          break;
        case "images":
          response = await api.get(`/posts/getPostTypeImagebyUserId/${user._id}`);
          break;
        case "videos":
          response = await api.get(`/posts/getPostTypeVideobyUserId/${user._id}`);
          break;
        default:
          response = await api.get(`/posts/getPostbyUserId/${user._id}`);
          break;
      }
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPosts(filter);
  }, [filter, user._id]);

  const handleFilterChange = (newFilter) => {

    setFilter(newFilter);
  };

  const Logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <View style={styles.container}>
      <HeaderProfile />
      <ProfilePicture user={user} />
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <MyFeed posts={posts} />
    </View>
  )
}
const ProfilePicture = ({ user }) => {
  return (
    <View style={styles.profilePicture}>
      <View style={styles.avatarBorder}>
        <Image style={styles.avatar}
          placeholder={blurhash}
          source={{ uri: user?.img }}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View style={styles.name}>
        <Text style={styles.username} >@{user?.username}</Text>
        <Text style={styles.fullname} >{user?.username}</Text>
      </View>
    </View>
  )
}
const Filter = ({ onFilterChange, filter }) => {
  return (
    <View style={styles.filter}>
      <FilterItem title="Featured" isActive={filter === "featured"} onPress={() => onFilterChange("featured")} />
      <FilterItem title="Images" isActive={filter === "images"} onPress={() => onFilterChange("images")} />
      <FilterItem title="Videos" isActive={filter === "videos"} onPress={() => onFilterChange("videos")} />
    </View>
  )
}
const FilterItem = ({ title, isActive, onPress }) => {
  return (
    <View style={isActive ? styles.filterItemActive : styles.filterItem} onTouchEnd={onPress}>
      <Text style={isActive ? styles.filterTitleActive : styles.filterTitle}>{title}</Text>
    </View>
  );
};
const MyFeed = ({ posts }) => {
  console.log("FILTER POSTS: ", posts);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.square}>
        {
          posts && posts.map((post, index) => (
            <View style={styles.post} key={index}>
              <Image style={styles.postImage}
                placeholder={blurhash}
                source={{ uri: post.image || post.video }}
                contentFit="cover"
                transition={1000}
              />
            </View>
          ))
        }
      </View>
    </ScrollView>
  )
}
export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profilePicture: {
    alignItems: 'center',
    bottom: 40,
  },
  avatarBorder: {
    backgroundColor: theme.colors.darkLight,
    height: 100,
    width: 100,
    borderRadius: 50,
    padding: 5,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 50,
    position: 'relative',
  },
  name: {
    marginTop: 10,
  },
  username: {
    fontSize: 16,
    textAlign: 'center'
  },
  fullname: {
    fontWeight: theme.fonts.semibold,
    textAlign: 'center'
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: wp(30),
    gap: 50,
  },
  filterItem: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    minWidth: 50,
    alignItems: 'center'
  },
  filterItemActive: {
    backgroundColor: theme.colors.text,
    padding: 10,
    borderRadius: 10,
    minWidth: 50,
    alignItems: 'center'
  },
  filterTitle: {
    color: '#111',
    fontWeight: theme.fonts.semibold
  },
  filterTitleActive: {
    color: '#fff'
  },
  square: {
    padding: wp(5),
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  post: {
    height: 120,
    width: wp(30),
    padding: 2,
    backgroundColor: '#f2f2f2'
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  noPosts: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
})