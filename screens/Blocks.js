// Blocks.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator,TouchableOpacity } from 'react-native';

const Blocks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://testnet-service.lisk.com/api/v3/blocks');
      const result = await response.json();
      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const navigateToDetails = (item) => {
    navigation.navigate('', { block: item });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.cellContainer}
            onPress={() => navigateToDetails(item)}
          >
            <View style={styles.cellContainer}>
              <Text style={styles.heading}>Block Info</Text>
              <Text style={styles.transactionId}>Height: {item.height}</Text>
              <Text style={styles.transactionText}>Timestamp: {item.timestamp}</Text>
              {/* Display other block properties */}
            </View>
            </TouchableOpacity>

          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  cellContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  heading:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transactionText: {
    fontSize: 14,
  },
});

export default Blocks;