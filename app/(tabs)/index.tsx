import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { affirmations } from '../../constants/affirmations';

export default function HomeScreen() {
  const todayAffirmation = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
    );
    return affirmations[dayOfYear % affirmations.length];
  }, []);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(data => {
      const parsed = data ? JSON.parse(data) : [];
      if (parsed.includes(todayAffirmation)) {
        setIsSaved(true);
      }
    });
  }, []);

  const saveToFavorites = async () => {
    const data = await AsyncStorage.getItem('favorites');
    const parsed = data ? JSON.parse(data) : [];
    if (!parsed.includes(todayAffirmation)) {
      parsed.push(todayAffirmation);
      await AsyncStorage.setItem('favorites', JSON.stringify(parsed));
      setIsSaved(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.affirmation}>
          “{todayAffirmation}”
        </Text>
      </View>

      <TouchableOpacity
        onPress={saveToFavorites}
        style={[styles.button, isSaved && styles.buttonDisabled]}
        disabled={isSaved}
      >
        <Text style={styles.buttonText}>
          {isSaved ? '❤️ Saved!' : '❤️ Save to Favorites'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F0F5',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    marginBottom: 20,
  },
  affirmation: {
    fontSize: 22,
    textAlign: 'center',
    color: '#444',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#FFB6C1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
