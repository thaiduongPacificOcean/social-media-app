import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import { blurhash, hp, wp } from '../helpers/common'
import { Image } from 'expo-image'
import { theme } from '../constants/theme'
import RichTextEditor from '../components/newpost/RichTextEditor'
import { useRouter } from 'expo-router'
import Icon from '../assets/icons'
import Button from '../components/Button'
import * as ImagePicker from 'expo-image-picker'
import api from '../utils/api'
import { AuthContext } from '../context/AuthContext'
import { Video } from 'expo-av'
import { storage } from '../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const NewPost = () => {

  const { user } = useContext(AuthContext);

  const bodyRef = useRef("")
  const editorRef = useRef(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(file)

  const onPick = async (isImage) => {
    let mediaConfig = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7
    }
    if (!isImage) {
      mediaConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig)
    if (!result.canceled) {
      setFile(result.assets[0])
    }
  }
  const isLocalFile = file => {
    if (!file) return null;
    if (typeof file == 'object') return true

    return false;
  }
  const getFileType = file => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.type;
    }
    // check image or video 
    if (file.includes('image')) {
      return 'image';
    }
    return 'video';
  }

  // upload Media file to firebase Storage

  const uploadMediaToFirebase = async (file) => {
    try {
      const fileUri = file.uri;
      const fileExtension = fileUri.split('.').pop(); // Lấy đuôi file
      const fileName = `${Date.now()}.${fileExtension}`; // Đổi tên file để tránh trùng lặp
      const response = await fetch(fileUri);
      const blob = await response.blob();

      let folder = 'media';
      if (file.type === 'video') {
        folder = 'videos';
      } else if (file.type === 'image') {
        folder = 'images';
      }

      const storageRef = ref(storage, `${folder}/${fileName}`);

      await uploadBytes(storageRef, blob);

      const downloadUrl = await getDownloadURL(storageRef);
      console.log('File available at', downloadUrl);
      return downloadUrl;
    }
    catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async () => {
    console.log('content :', bodyRef.current)
    console.log('file :', file)

    if (!bodyRef.current && !file) {
      Alert.alert('Post:', 'Please choose an image, video or provide post content')
      return;
    }
    setLoading(true)
    try {

      let mediaUrl = null;

      if (file) {
        mediaUrl = await uploadMediaToFirebase(file);
      }

      console.log("URL : ", mediaUrl)

      let imageUrl = null;
      let videoUrl = null;

      if (mediaUrl) {
        const cleanUrl = mediaUrl.split('?')[0];
        const fileExtension = cleanUrl.split('.').pop().toLowerCase();
        console.log('Media URL:', mediaUrl);
        console.log('File Extension:', fileExtension);

        // image
        if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
          imageUrl = mediaUrl;
        }
        // video
        else if (['mp4', 'mov', 'avi'].includes(fileExtension)) {
          videoUrl = mediaUrl;
        }
      }
      console.log('Image URL:', imageUrl);
      console.log('Video URL:', videoUrl);

      const newPost = {
        content: bodyRef.current || "",
        author: user._id,
        imageUrl,
        videoUrl
      };


      await api.post("/posts/createPost", newPost);

      setLoading(false)

      router.push('home');

    } catch (error) {

      console.log(error)

      setLoading(false)

    }
  }


  return (
    <ScreenWrapper bg={'white'}>
      <ScrollView style={{ marginBottom: 10}}>
        <View style={styles.container}>
          <Header title={'New Post'} />
          <UserInfomation user={user} />

          <RichTextEditor editorRef={editorRef} onChange={body => bodyRef.current = body} />
          {
            file && (
              <View style={styles.file}>
                {
                  getFileType(file) == 'video' ? (
                    <View>
                      <Video
                        source={{ uri: file.uri }}
                        useNativeControls
                        isLooping
                        resizeMode='cover'
                        style={styles.video}
                      />
                    </View>
                  ) :
                    (
                      <View>
                        <Image source={{ uri: file.uri }} style={styles.imageMedia} />
                      </View>
                    )
                }
                <Pressable style={styles.closeIcon} onPress={() => setFile(null)}>
                  <Icon name="delete" size={22} color="white" />
                </Pressable>
              </View>
            )
          }

          <View style={styles.media}>
            <Text style={styles.addTitle}>Add your media</Text>
            <View style={styles.mediaIcon}>
              <TouchableOpacity onPress={() => onPick(true)}>
                <Icon name="image" size={25} color={theme.colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                <Icon name="video" size={25} color={theme.colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
          <Button
            title='Post'
            buttonStyle={{ height: hp(6.2) }}
            loading={loading}
            hasShadow={false}
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
    </ScreenWrapper >
  )
}
const UserInfomation = ({ user }) => {
  return (
    <View style={styles.info}>
      <View style={styles.avatar}>
        <Image
          style={styles.image}
          placeholder={blurhash}
          source={{ uri: user?.img }}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View style={styles.text}>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.status}>Public</Text>
      </View>
    </View>
  )
}

export default NewPost

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    gap: 20
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10
  },
  text: {
    gap: 5
  },
  username: {
    fontWeight: theme.fonts.bold,
    fontSize: 16
  },
  status: {
    color: theme.colors.text,
    fontSize: 12
  },
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    paddingHorizontal: 18,
    borderCurve: 'continuous',
    borderRadius: theme.radius.xl,
    borderColor: theme.colors.gray
  },
  addTitle: {
    fontSize: hp(1.9),
    color: theme.colors.text
  },
  mediaIcon: {
    flexDirection: 'row',
    gap: 5,
  },
  file: {
    width: '100%',
    height: 250,
    borderRadius: 10
  },
  video: {
    height: '100%',
    width: '100%',
    borderRadius: 10
  },
  imageMedia: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: 'rgba(255,0,0,0.6)',
    borderRadius: 50
  },

})