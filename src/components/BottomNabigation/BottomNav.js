import * as React from 'react';
import { Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapScreen from '../../screens/MapScreen/MapScreen';
import Chat from '../../screens/ChatScreen/ChatScreen';
import AddFriends from '../../screens/AddFriends/AddFriends';
import HomeScreen from '../../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                elevation: 0,
                backgroundColor: '#fff',
                height: 50,
            }
          }}
        >
            <Tab.Screen name="Home" component={HomeScreen} 
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0}}>
                        <Image
                            source={require('../../../assets/icons/home.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'green' : '#000',

                            }}
                        />
                    </View>
                )
            }} />
            <Tab.Screen name="Map" component={MapScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0}}>
                        <Image
                            source={require('../../../assets/icons/location.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'green' : '#000'
                            }}
                        />
                    </View>
                )
            }} />
            <Tab.Screen name="Chat" component={Chat}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0}}>
                        <Image
                            source={require('../../../assets/icons/chat.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'green' : '#000'
                            }}
                        />
                    </View>
                )
            }} />
            <Tab.Screen name="AddFriends" component={AddFriends}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0}}>
                        <Image
                            source={require('../../../assets/icons/add.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'green' : '#000'
                            }}
                        />
                    </View>
                )
            }} />
        </Tab.Navigator>
        );
    }
export default BottomNav;

