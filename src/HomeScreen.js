import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ assignments }) => {
  const navigation = useNavigation(); // 네비게이션 사용
  const [taskList, setTaskList] = useState([]); // 현재 화면에 표시되는 할 일 목록
  const [originalTaskList, setOriginalTaskList] = useState([]); // 새로고침을 위해 전체 데이터를 저장

  useEffect(() => {
    if (assignments && assignments.length > 0) {
      setTaskList(assignments); // 초기 데이터 설정
      setOriginalTaskList(assignments); // 새로고침을 위해 데이터 백업
    }
  }, [assignments]);

  const handleRemoveTask = (task) => {
    setTaskList((prevTaskList) => prevTaskList.filter((item) => item !== task));
  };

  const handleRefresh = () => {
    setTaskList(originalTaskList); // 새로고침 시 원래 데이터 복원
  };

  const handleTabPress = (tab) => {
    if (tab === 'alarm') {
      navigation.navigate('NotificationScreen');
    } else if (tab === 'profile') {
      navigation.navigate('ProfileScreen');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
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
        {/* Task List */}
        {taskList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>현재 처리할 할 일이 없습니다.</Text>
          </View>
        ) : (
          <FlatList
            data={taskList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleRemoveTask(item)} // 터치 시 taskCard 제거
                style={styles.taskCard}
              >
                <Text style={styles.taskTitle}>과목: {item.courseName}</Text>
                <Text style={styles.taskDetails}>
                  마감 기한: {item.deadline}
                </Text>
                <Text style={styles.taskStatus}>상태: {item.status}</Text>
                <Text style={styles.taskDetails}>할 일: {item.title}</Text>
                <Text style={styles.taskDetails}>주차: {item.week}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.taskList}
          />
        )}
      </View>
      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={styles.navButton}
        >
          <Image
            source={require('../assets/home-1.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress('alarm')}
          style={styles.navButton}
        >
          <Image
            source={require('../assets/alarm-2.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress('profile')}
          style={styles.navButton}
        >
          <Image
            source={require('../assets/profile-2.png')}
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
    backgroundColor: '#f7f9fc',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 중앙 정렬
    marginBottom: 20,
    position: 'relative', // 상대 위치 설정
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center', // 텍스트 중앙 정렬
    flex: 1, // 제목을 화면 중앙에 배치
  },
  refreshButton: {
    position: 'absolute',
    right: 0, // 오른쪽에 배치
  },
  refreshIcon: {
    width: 24,
    height: 24,
  },
  taskList: {
    paddingBottom: 80,
  },
  taskCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  taskStatus: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 3,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
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
