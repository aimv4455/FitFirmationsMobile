import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { categories } from '../../constants/categories';
import { useRouter } from 'expo-router';

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>

      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={styles.card}
          onPress={() => router.push(`/categories/${cat.id}`)}
        >
          <Text style={styles.title}>{cat.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
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
  title: { fontSize: 18, color: '#444' },
});
