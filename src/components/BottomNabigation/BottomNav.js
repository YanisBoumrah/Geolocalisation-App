import * as React from 'react';
import { Text, View,Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapScreen from '../../screens/MapScreen/MapScreen';
import Chat from '../../screens/ChatScreen/ChatScreen';
import AddFriends from '../../screens/AddFriends/AddFriends';
import HomeScreen from '../../screens/HomeScreen';
import LogOut from '../LogOutButton/LogOut';
import VoidComp from '../voidComponent/VoidComp';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#000',
                height: 50,
                borderTopWidth: 0,
            }
          }}
        >
            <Tab.Screen name="ConnectedPage" component={HomeScreen} 
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0}}>
                        <Image
                            source={require('../../../assets/icons/home.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'green' : '#fff',

                            }}
                        />
                    </View>
                ),
                title: null,
                header:LogOut
                            }}

            
             />
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
                                tintColor: focused ? 'green' : '#fff'
                            }}
                        />
                    </View>
                ),
                title: null,
                header:VoidComp
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
                                tintColor: focused ? 'green' : '#fff'
                            }}
                        />
                    </View>
                ),
                title: null,
                header:VoidComp
            }} />
            <Tab.Screen name="AddFriends" component={AddFriends}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0}}>
                        <Image
                            source={require('../../../assets/icons/addFreinds.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'green' : '#fff'
                            }}
                        />
                    </View>
                ),
                title: null,
                header:VoidComp
        
            }} />
        </Tab.Navigator>
        );
    }
export default BottomNav;

