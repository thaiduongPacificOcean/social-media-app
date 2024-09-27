import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import NotificationItem from '../components/notification/NotificationItem'

import { wp } from '../helpers/common'
import useFetch from '../hooks/useFetch'
import { AuthContext } from '../context/AuthContext'
const notification = () => {

    const { user, dispatch } = useContext(AuthContext);

    const { data } = useFetch(`/notifications/getNotificationbyUserId/${user._id}`);

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Header title="Notification" />
                {
                    data && data.map((notification, index) => {
                        return (
                            <NotificationItem notification={notification} key={index} />
                        )
                    })
                }
            </View>
        </ScreenWrapper>
    )
}

export default notification

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
        gap: 18
    }
})