import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BlockDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.word}>Hello!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BlockDetails;