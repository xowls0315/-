import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ onLogout }) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('profile');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    if (tab === 'home') {
      navigation.navigate('HomeScreen');
    } else if (tab === 'alarm') {
      navigation.navigate('NotificationScreen');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>PROFILE</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Image
              source={require('../assets/user-icon.png')}
              style={styles.icon}
            />
            <Text style={styles.infoLabel}>이름</Text>
            <Text style={styles.infoText}>홍길동</Text>
          </View>
          <View style={styles.infoRow}>
            <Image
              source={require('../assets/id-icon.png')}
              style={styles.icon}
            />
            <Text style={styles.infoLabel}>학번</Text>
            <Text style={styles.infoText}>2412345</Text>
          </View>
          <View style={styles.infoRow}>
            <Image
              source={require('../assets/school-icon.png')}
              style={styles.icon}
            />
            <Text style={styles.infoLabel}>소속</Text>
            <Text style={styles.infoText}>모바일소프트웨어트랙</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* 하단 네비게이션 바 */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          onPress={() => handleTabPress('home')}
          style={styles.navButton}
        >
          <Image
            source={
              selectedTab === 'home'
                ? require('../assets/home-1.png')
                : require('../assets/home-2.png')
            }
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress('alarm')}
          style={styles.navButton}
        >
          <Image
            source={
              selectedTab === 'alarm'
                ? require('../assets/alarm-1.png')
                : require('../assets/alarm-2.png')
            }
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress('profile')}
          style={styles.navButton}
        >
          <Image
            source={
              selectedTab === 'profile'
                ? require('../assets/profile-1.png')
                : require('../assets/profile-2.png')
            }
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7f9fc',
  },
  logo: {
    width: '80%',
    height: 50,
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  loginButton: {
    width: '80%',
    height: 45,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
