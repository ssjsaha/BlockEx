import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const Transactions = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://testnet-service.lisk.com/api/v3/transactions?address=lsk6u3fwtbbcauvaupgdq5q9v6h4bvjp86sq7aesu');
      const result = await response.json();
      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const navigateToDetails = (item) => {
    navigation.navigate('TransactionDetails', { transaction: item });
  };

  const renderListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cellContainer}
      onPress={() => navigateToDetails(item)}
    >
      <View>
        <Text style={styles.transactionId}>Transaction Info</Text>
        <Text style={styles.transactionText}>Fee: {item.fee}</Text>
        <Text style={styles.transactionText}>Sender name: {item.sender.name}</Text>

        {/* Display other data properties */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderListItem}
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
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transactionText: {
    fontSize: 14,
  },
});

export default Transactions;
