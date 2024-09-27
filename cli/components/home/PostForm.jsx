import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { blurhash } from '../../helpers/common'
import { theme } from '../../constants/theme'
import Icon from '../../assets/icons'
import { useRouter } from 'expo-router'

const PostForm = () => {
    const router = useRouter();

    const openCreatePost = () => {
        router.push('newPost');
    }
    return (
        <TouchableOpacity onPress={openCreatePost}>
            <View style={styles.postForm}>
                <View style={styles.topForm}>
                    <Text style={{ color: theme.colors.textLight, fontSize: 14 }}>Write something...</Text>
                </View>
                <View style={styles.bottomForm}>
                    <View style={styles.icons}>
                        <View style={styles.icon}>
                            <Icon name="image" size={20} stokeWidth={1.6} />
                        </View>
                        <View style={styles.icon}>
                            <Icon name="video" size={20} stokeWidth={1.6} />
                        </View>
                        <View style={styles.icon}>
                            <Icon name="location" size={20} stokeWidth={1.6} />
                        </View>
                        <View style={styles.icon}>
                            <Icon name="edit" size={20} stokeWidth={1.6} />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.buttonPost}>
                            <Text style={{ color: '#fff' }}>Post</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PostForm

const styles = StyleSheet.create({
    postForm: {
        backgroundColor: '#f2f2f2',
        padding: 20,
        borderRadius: 20,
        gap: 10,
    },
    topForm: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomForm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        padding: 3,
        marginRight: 15,
        borderRadius: 40,
    },
    icons: {
        flexDirection: 'row',
        gap: 15
    },
    icon: {
        borderWidth: 1,
        padding: 2,
        borderColor: theme.colors.gray,
        borderRadius: 10

    },
    buttonPost: {
        width: 60,
        height: 35,
        backgroundColor: theme.colors.darkPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})