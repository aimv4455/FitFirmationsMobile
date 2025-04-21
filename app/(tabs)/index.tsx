import { View, Text, StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { affirmations } from '../../constants/affirmations';

export default function HomeScreen() {
  const todayAffirmation = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
    );
    return affirmations[dayOfYear % affirmations.length];
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.affirmation}>
          “{todayAffirmation}”
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F0F5', // Soft pastel lavender
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
  },
  affirmation: {
    fontSize: 22,
    textAlign: 'center',
    color: '#444',
    fontWeight: '500',
  },
});
