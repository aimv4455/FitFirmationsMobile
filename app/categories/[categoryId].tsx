import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { categories } from '../../constants/categories';

export default function CategoryDetailScreen() {
  const { categoryId } = useLocalSearchParams();
  const router = useRouter();
  const category = categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Category not found 😢</Text>
      </View>
    );
  }

    return (
    <View style={styles.container}>
      <Text style={styles.back} onPress={() => router.push('/categories')}>
        ← Back
      </Text>

      <Text style={styles.title}>{category.title}</Text>

      <FlatList
        data={category.affirmations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.affirmation}>“{item}”</Text>
          </View>
        )}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  back: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'left',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F7F0F5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  affirmation: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
  },
});
