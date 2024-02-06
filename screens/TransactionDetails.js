import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Clipboard, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install the required dependency

const TransactionDetails2 = ({ route, navigation }) => {
  const { transaction } = route.params;
  const [isFloatingVisible, setFloatingVisible] = useState(false);

  const getStatusColor = (status) => {
    const lowerCaseStatus = status.toLowerCase();

    if (lowerCaseStatus.includes('success')) {
      return '#4CAF50'; // Green
    } else if (lowerCaseStatus.includes('fail')) {
      return '#FF5252'; // Red
    } else if (lowerCaseStatus.includes('pending')) {
      return '#FFD600'; // Yellow
    } else {
      return '#333333'; // Default color
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(transaction.id);
    setFloatingVisible(true);
  };

  const handleBackButton = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  useEffect(() => {
    // Hide the floating view after 1 second
    const timer = setTimeout(() => {
      setFloatingVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isFloatingVisible]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={handleBackButton}>
            <Ionicons name="md-arrow-back" size={24} color="#333333" style={styles.backButton} />
          </TouchableWithoutFeedback>
          <Text style={styles.title}>Transaction Details</Text>
        </View>

        <View style={styles.cellContainer}>
          <View style={styles.idContainer}>
            <Text style={styles.label}>ID:</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.value}>{transaction.id}</Text>
          </View>

          <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cellContainer}>
          <Text style={[styles.label, { color: getStatusColor(transaction.executionStatus) }]}>
            Status: {transaction.executionStatus.toUpperCase()}
          </Text>
        </View>

        <View style={styles.cellContainer}>
          <Text style={styles.label}>Module Command:</Text>
          <Text style={styles.value}>{transaction.moduleCommand}</Text>
        </View>

        <View style={styles.cellContainer}>
          <Text style={styles.label}>Nonce:</Text>
          <Text style={styles.value}>{transaction.nonce}</Text>
        </View>

        <View style={styles.cellContainer}>
          <Text style={styles.label}>Fee:</Text>
          <Text style={styles.value}>{transaction.fee}</Text>
        </View>

        <View style={styles.cellContainer}>
          <Text style={styles.label}>Block ID:</Text>
          <Text style={styles.value}>{transaction.block.id}</Text>
        </View>

        {/* Display other transaction details */}
      </View>

      {isFloatingVisible && (
        <View style={styles.floatingView}>
          <Text style={styles.floatingText}>Copied to Clipboard!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    padding: 20,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  cellContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#333333',
    flex: 1, // Allow the value to take up remaining space
  },
  copyButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#4CAF50', // Green color
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#4CAF50', // Green color
  },
  floatingView: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50', // Green color
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  floatingText: {
    color: '#ffffff',
  },
});

export default TransactionDetails2;