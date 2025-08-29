import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useWishlist } from "../hooks/useWishlist";
import { useEffect } from "react";

export default function Wishlist() {
  const { items, loadItems } = useWishlist();

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY WISHLIST</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image || "https://via.placeholder.com/50" }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text>{item.price || "N/A"}</Text>
              <Text style={styles.source}>{item.source}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 10,
  },
  image: { width: 50, height: 50, borderRadius: 8 },
  info: { marginLeft: 12 },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  source: { fontSize: 12, color: "gray" },
});
