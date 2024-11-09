import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

// 매뉴얼 화면
const ManualScreen = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      text: '수강중인 과목의 출석 여부를 파악해 결석자 미리 알림을 알려드려요!',
      image: require('../assets/page1.png'),
      buttonText: 'Next',
    },
    {
      text: '각각의 일정을 터치하면 상세 내용을 알아볼 수 있어요!',
      image: require('../assets/page2.png'),
      buttonText: 'Next',
    },
    {
      text: '과제 제출 또는 일정 설정을 완료했다면 상단의 서류봉투 버튼을 눌러 알림 목록을 정리할 수 있어요!',
      image: require('../assets/page3.png'),
      buttonText: 'Next',
    },
    {
      text: '사용자가 설정한 기준에 따라 마감 기한이 임박한 과제들을 알림으로 알려드려요!',
      image: require('../assets/page4.png'),
      buttonText: 'Start',
    },
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete(); // 마지막 페이지에서 완료 콜백 호출
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSkip = () => {
    onComplete(); // Skip 버튼 클릭 시 완료 콜백 호출
  };

  return (
    <View style={styles.manualContainer}>
      <View
        style={[
          styles.imageContainer,
          currentPage === 3 && styles.page4Container, // page4 스타일 추가
        ]}
      >
        <Image source={pages[currentPage].image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.pageText}>{pages[currentPage].text}</Text>
      </View>
      <View style={styles.navigationContainer}>
        {currentPage === 0 ? (
          <Button title="Skip" onPress={handleSkip} color="#000000" />
        ) : (
          <Button title="← Prev" onPress={handlePrev} color="#000000" />
        )}
        <Image source={require('../assets/icon.png')} style={styles.icon} />
        <Button
          title={pages[currentPage].buttonText}
          onPress={handleNext}
          color="#000000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  manualContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  imageContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  page4Container: {
    margin: 70,
    backgroundColor: '#ffffff', // 흰색 배경 추가
    borderRadius: 10, // borderRadius 추가
    padding: 10, // 여백 추가
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // 이미지가 화면에 맞게 조정되도록 설정
  },
  textContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e0f7fa', // 파란색 배경 추가
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 50,
  },
});

export default ManualScreen;
