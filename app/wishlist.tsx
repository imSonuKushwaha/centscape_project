import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import WishlistItem from "../components/WishlistItem"; // ✅ same UI as Dashboard
import { useWishlist } from "../hooks/useWishlist";
import { fetchPreview } from "../services/api";
import { normalizeUrl } from "../utils/normalizeUrl";

export default function Wishlist() {
  const { items, loadItems, addItem } = useWishlist();
  const [url, setUrl] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const handleFetch = async () => {
    if (!url) return;
    try {
      const data = await fetchPreview(url);
      await addItem({
        id: Date.now().toString(),
        title: data.title || "Untitled",
        image: data.image || "https://via.placeholder.com/50",
        price: data.price ? Number(data.price) : undefined,
        source: data.siteName || new URL(data.sourceUrl).hostname,
        createdAt: Date.now(),
        normalizedUrl: normalizeUrl(data.sourceUrl),
      });
      setUrl("");
    } catch {
      alert("❌ Failed to fetch preview");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY WISHLIST</Text>

      {/* Paste URL + Fetch */}
      <View style={styles.addBox}>
        <TextInput
          value={url}
          onChangeText={setUrl}
          placeholder="Paste URL here"
          style={styles.input}
        />
        <TouchableOpacity style={styles.fetchBtn} onPress={handleFetch}>
          <Text style={styles.fetchText}>Fetch</Text>
        </TouchableOpacity>
      </View>

      {/* Wishlist list (reused UI from Dashboard) */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WishlistItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#E6F9E6" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },

  // Add flow
  addBox: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  fetchBtn: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  fetchText: { color: "#fff", fontWeight: "600" },
});
