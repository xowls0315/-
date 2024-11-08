import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import ManualScreen from './ManualScreen';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showManual, setShowManual] = useState(true); // 매뉴얼 화면 상태 추가
  const subjects = ['고급모바일프로그래밍', '설계패턴', '웹프레임워크1'];

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
    Alert.alert(`선택된 과목: ${subject}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen subjects={subjects} onSubjectClick={handleSubjectClick} />
    </View>
  );
}
