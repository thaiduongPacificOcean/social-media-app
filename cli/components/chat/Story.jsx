import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Image } from 'expo-image';
import { blurhash } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';
import DEFAULT_IMG from '../../utils/defaultImage';

const Story = () => {
  const { user, dispatch } = useContext(AuthContext);

  const { data, loading, error, reFetch } = useFetch(`/users`);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyContainer}>
      <View>
        <TouchableOpacity>
          <View style={styles.myStory}>
            <Image style={styles.story}
              placeholder={blurhash}
              source={user?.img}
              contentFit="cover"
              transition={1000}
            />
            <View style={styles.iconPlus}>
              <Icon name="plus" size={15} stokeWidth={1.6} style={styles.icon} />
            </View>
            <Text style={styles.you}>
              You
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {
        data?.map((user, index) => (
          <View key={index}>
            <TouchableOpacity>
              <View style={styles.imgStory}>
                <Image style={styles.story}
                  placeholder={blurhash}
                  source={{ uri: user.img ? user?.img : DEFAULT_IMG }}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
              <Text style={styles.strName}>
                {user.username.length > 10 ? user.username.slice(0, 9).toLowerCase() + '...'
                  : user.username.toLowerCase()}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      }
    </ScrollView>
  )
}

export default Story

const styles = StyleSheet.create({
  storyContainer: {
  },
  myStory: {
    width: 70,
    height: 70,
    padding: 3,
    marginRight: 15,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 40,
    position: 'relative'
  },
  iconPlus: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 15
  },
  icon: {
    position: 'absolute',
    top: 3,
    left: 2,
  },
  imgStory: {
    width: 70,
    height: 70,
    padding: 3,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 40,
    marginRight: 10
  },
  story: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 40,
  },
  strName: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 12,
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 5,
    marginRight: 10
  },
  you: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 12,
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 5,

  }
})