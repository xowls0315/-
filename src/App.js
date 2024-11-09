import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import ManualScreen from './ManualScreen';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen'; // 알림 화면 추가

// 초기 과목 데이터
const initialSubjects = [
  {
    title: '고급모바일프로그래밍',
    details: '과제: 4시간 남음',
    color: '#d1e7ff',
  },
  { title: '웹프레임워크1', details: '영상: 5시간 남음', color: '#ffd1d1' },
  { title: 'SW프로그래밍', details: '과제: 1일 2시간 남음', color: '#d1ffd1' },
  {
    title: '시스템프로그래밍',
    details: '과제: 5일 7시간 남음',
    color: '#ffe6b3',
  },
  { title: '선형대수', details: '과제: 6일 남음', color: '#fff3d1' },
  { title: '설계패턴', details: '과제: 6일 13시간 남음', color: '#f3d1ff' },
];

const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showManual, setShowManual] = useState(true);

  if (!loaded) {
    return <SplashScreen onLoaded={() => setLoaded(true)} />;
  }

  if (!loggedIn) {
    return <LoginScreen onLoginSuccess={() => setLoggedIn(true)} />;
  }

  if (showManual) {
    return <ManualScreen onComplete={() => setShowManual(false)} />;
  }

  const handleSubjectClick = (subject) => {
    Alert.alert(`선택된 과목: ${subject.title}`, subject.details);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          options={{ headerShown: false }} // 헤더 숨기기
        >
          {(props) => (
            <HomeScreen
              {...props}
              subjects={initialSubjects}
              onSubjectClick={handleSubjectClick}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{ headerShown: false }} // 헤더 숨기기
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
