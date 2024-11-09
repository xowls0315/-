import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 추가

// 알림 화면
const NotificationScreen = () => {
  const [selectedTab, setSelectedTab] = useState('alarm'); // 현재 활성화된 탭 설정
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // 네비게이션 훅 사용

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setModalVisible(false); // 모달 닫기
  };

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    if (tab === 'home') {
      navigation.navigate('HomeScreen'); // 홈 화면으로 이동
    } else if (tab === 'profile') {
      navigation.navigate('ProfileScreen'); // 프로필 화면으로 이동
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.notificationContainer}>
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title}>알림 센터</Text>
        </View>
        {/* 알림 항목들 */}
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>
            웹프레임워크1 영상 시청까지 5시간 남았습니다.
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.timeSelectText}>시간 설정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>
            고급모바일프로그래밍 과제 제출까지 6시간 남았습니다.
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.timeSelectText}>시간 설정</Text>
          </TouchableOpacity>
        </View>

        {/* 시간 설정 모달 */}
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>알림 시간 설정</Text>
              {['3시간 전', '6시간 전', '12시간 전', '1일 전', '3일 전'].map(
                (time) => (
                  <TouchableOpacity
                    key={time}
                    onPress={() => handleTimeSelect(time)}
                    style={styles.modalOption}
                  >
                    <Text style={styles.modalText}>{time}</Text>
                  </TouchableOpacity>
                )
              )}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* 하단 네비게이션 바 */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          onPress={() => handleTabPress('home')}
          style={styles.navButton}
        >
          <Image
            source={
              selectedTab === 'home'
                ? require('../assets/home-1.png') // 활성화된 홈 아이콘
                : require('../assets/home-2.png') // 비활성화된 홈 아이콘
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
                ? require('../assets/alarm-1.png') // 활성화된 알림 아이콘
                : require('../assets/alarm-2.png') // 비활성화된 알림 아이콘
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
                ? require('../assets/profile-1.png') // 활성화된 프로필 아이콘
                : require('../assets/profile-2.png') // 비활성화된 프로필 아이콘
            }
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  notificationContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  notificationItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  timeSelectText: {
    color: '#1d4ed8',
    marginTop: 8,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#1d4ed8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 3,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute', // 네비게이션 바를 하단에 고정
    left: 0,
    right: 0,
    bottom: 35,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    width: 70,
    height: 30,
  },
});

export default NotificationScreen;
