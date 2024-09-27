import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Image } from 'expo-image'
import { Video } from 'expo-av'
import { blurhash, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import Icon from '../../assets/icons'
import { Entypo } from '@expo/vector-icons'
import RenderHtml from 'react-native-render-html';
import { AuthContext } from '../../context/AuthContext'
import api from '../../utils/api'
import DEFAULT_IMG from '../../utils/defaultImage'

const Post = ({ item, reFetch }) => {

  const { user, dispatch } = useContext(AuthContext);
  const [likes, setLikes] = useState(item.likes.length);
  const [isLiked, setIsLiked] = useState(item.likes.includes(user._id));
  const [loading, setLoading] = useState(false);

  const onLike = async (userId) => {
    setLoading(true);
    console.log("User Id: ", userId);
    console.log("Post Id: ", item._id);

    try {
      const updateLike = {
        postId: item._id,
        userId: userId,
      };
      await api.post("/posts/like", updateLike);

      setIsLiked(!isLiked);
      setLikes((prevLikes) => isLiked ? prevLikes - 1 : prevLikes + 1);
      reFetch();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.infoGroup}>
          <Image style={styles.avatar}
            placeholder={blurhash}
            source={item.author.img ? item?.author?.img : DEFAULT_IMG}
            contentFit="cover"
            transition={1000}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{item.author.username}</Text>
            <Text style={styles.time}>1h ago</Text>
          </View>
        </View>
        <View style={styles.icon}>
          <Entypo name="dots-three-horizontal" size={18} color={theme.colors.text} />
        </View>
      </View>
      <View>
        {item.content && (
          <RenderHtml
            source={{ html: item.content }}
            baseStyle={styles.caption}
            contentWidth={wp(100)}
          />
        )}
      </View>
      {
        item.image ? (
          <View style={styles.postImage}>
            <Image style={styles.img}
              placeholder={blurhash}
              source={{ uri: item.image }}
              contentFit="cover"
              transition={1000}
            />
          </View>
        ) : item.video ? (
          <View style={styles.postImage}>
            <Video
              source={{ uri: item.video }}
              useNativeControls
              isLooping
              resizeMode='cover'
              style={styles.video}
            />
          </View>
        ) : null
      }

      <View style={styles.postFooter}>
        <View style={styles.leftFooterIconContainer}>
          <TouchableOpacity onPress={() => onLike(user._id)} disabled={loading}>
            <Icon
              name="heart"
              size={30}
              strokeWidth={1.6}
              fill={isLiked ? theme.colors.rose : 'none'}
              color={isLiked ? theme.colors.rose : theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.like}>
            <Text style={styles.likeCount}>
              {item.likes.length.toLocaleString('en')} lượt thích
            </Text>
          </View>
        </View>
        <View style={styles.rightFooterIconContainer}>
          <TouchableOpacity>
            <Icon name="comment" size={30} stokeWidth={1.6} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="send" size={25} stokeWidth={1.6} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    maxHeight: 420,
    marginBottom: 20,
    borderRadius: 20,
    padding: 15,
    gap: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoGroup: {
    flexDirection: 'row',
    gap: 18
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  name: {
    fontSize: 18,
    color: theme.colors.textDark,
    fontWeight: theme.fonts.semibold,
  },
  time: {
    fontSize: 12,
    color: theme.colors.textLight
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
  video: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftFooterIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightFooterIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  likeCount: {
    fontSize: 12,
    color: theme.colors.text,
    marginLeft: 5
  },
  caption: {
    color: theme.colors.text
  },
  icon: {
    marginBottom: 20
  }
})