import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 추가

// 홈 화면
const HomeScreen = ({ subjects = [] }) => {
  const [subjectList, setSubjectList] = useState(subjects);
  const [selectedTab, setSelectedTab] = useState('home');
  const navigation = useNavigation(); // 네비게이션 훅 사용

  const handleSubjectClick = (subject) => {
    Alert.alert('과목 선택', `${subject.title}의 수행할 업무가 출력됩니다.`);
    setSubjectList((prevSubjects) =>
      prevSubjects.filter((item) => item.title !== subject.title)
    );
  };

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    if (tab === 'alarm') {
      navigation.navigate('NotificationScreen'); // 알림 화면으로 이동
    }
  };

  const handleRefresh = () => {
    setSubjectList(subjects);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Schedule</Text>
          <TouchableOpacity
            onPress={handleRefresh}
            style={styles.refreshButton}
          >
            <Image
              source={require('../assets/refresh.png')}
              style={styles.refreshIcon}
            />
          </TouchableOpacity>
        </View>
        {subjectList.length > 0 ? (
          <FlatList
            data={subjectList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSubjectClick(item)}
                style={[styles.subjectCard, { backgroundColor: item.color }]}
              >
                <Text style={styles.subjectTitle}>{item.title}</Text>
                <Text style={styles.subjectDetails}>{item.details}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.noSubjectsContainer}>
            <Text style={styles.noSubjectsText}>남은 과제가 없습니다.</Text>
          </View>
        )}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 수정: 모든 항목을 중앙에 정렬
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  refreshButton: {
    position: 'absolute', // 수정: 새로고침 버튼을 절대 위치로 설정
    right: 16, // 오른쪽 여백 설정
  },
  refreshIcon: {
    width: 27,
    height: 27,
  },
  subjectCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subjectDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noSubjectsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSubjectsText: {
    fontSize: 25,
    color: '#999',
    textAlign: 'center',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute', // 네비게이션 바를 하단에 고정
    left: 0,
    right: 0,
    bottom: 0,
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

export default HomeScreen;
