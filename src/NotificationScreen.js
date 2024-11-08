import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 알림 설정 화면
function NotificationScreen() {
  return (
    <View style={styles.notificationContainer}>
      <Text>알림 설정을 여기에 추가하세요.</Text>
      {/* 알림 설정 UI 추가 */}
    </View>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationScreen;
