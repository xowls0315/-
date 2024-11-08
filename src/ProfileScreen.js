import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 프로필 화면
function ProfileScreen() {
  return (
    <View style={styles.profileContainer}>
      <Text>학생 정보:</Text>
      {/* 학생 정보 표시 UI 추가 */}
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProfileScreen;
