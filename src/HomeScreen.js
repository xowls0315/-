import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// 홈 화면
function HomeScreen({ subjects, onSubjectClick }) {
  return (
    <View style={styles.homeContainer}>
      <Text>내 수강 과목:</Text>
      <FlatList
        data={subjects}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSubjectClick(item)}>
            <Text style={styles.subjectItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: { flex: 1, padding: 16 },
  subjectItem: { fontSize: 18, padding: 8 },
});

export default HomeScreen;
