import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Icon from '../../assets/icons';
import { theme } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: theme.colors.darkPrimary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }
    }} >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => <Icon name="home" size={26} strokeWidth={1.6} color={focused ? theme.colors.darkLight : theme.colors.text} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => <Icon name="comment" size={26} strokeWidth={1.6} color={focused ? theme.colors.darkLight : theme.colors.text} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarIcon: ({ focused }) => <Icon name="heart" size={26} strokeWidth={1.6} color={focused ? theme.colors.darkLight : theme.colors.text} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <Icon name="user" size={26} strokeWidth={1.6} color={focused ? theme.colors.darkLight : theme.colors.text} />,
        }}
      />
    </Tabs>
  );
}

