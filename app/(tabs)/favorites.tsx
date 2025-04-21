import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(data => {
      const parsed = data ? JSON.parse(data) : [];
      setFavorites(parsed);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Favorites</Text>

      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.affirmation}>“{item}”</Text>
            </View>
          )}
        />
      )}

      <Text style={styles.tip}>
        💡 Favorites are saved on your device. If you delete the app, they’ll be reset.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  empty: { textAlign: 'center', fontSize: 16, color: '#999' },
  card: {
    backgroundColor: '#F7F0F5',
    padding: 20,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  affirmation: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  tip: {
    marginTop: 20,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});
