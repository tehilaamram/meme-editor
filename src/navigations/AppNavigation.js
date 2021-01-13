import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ImageGalleryScreen from '../screens/ImageGalleryScreen';
import MemeEditorScreen from '../screens/MemeEditorScreen';
import MemesScreen from '../screens/MemesScreen';

const Tab = createMaterialTopTabNavigator();
const RootStack = createStackNavigator();

function HomeStack() {
    return (
        <RootStack.Navigator  screenOptions={{
            headerShown: false
          }}>
            <RootStack.Screen name="Gallery" component={ImageGalleryScreen} />
            <RootStack.Screen name="MemeEditor" component={MemeEditorScreen} initialParams={{ img: {} }} />
        </RootStack.Navigator>
    );
}
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    labelStyle: { fontSize: 12 },
                    tabStyle: { width: 100 },
                    style: { backgroundColor: 'powderblue' },
                }}
            >
                <Tab.Screen name="Gallery" component={HomeStack} />
                <Tab.Screen name="Memes" component={MemesScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
