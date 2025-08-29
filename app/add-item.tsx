import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useWishlist } from "../hooks/useWishlist";
import { fetchPreview } from "../services/api";
import { normalizeUrl } from "../utils/normalizeUrl";

export default function AddItem() {
  const params = useLocalSearchParams(); // deep link params
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState<any>(null);
  const { addItem } = useWishlist();

  useEffect(() => {
    if (params.url && typeof params.url === "string") {
      setUrl(params.url);
    }
  }, [params]);

  const handleFetch = async () => {
    try {
      const data = await fetchPreview(url);
      setPreview(data);
    } catch {
      alert("Failed to fetch preview");
    }
  };

  const handleSave = () => {
    if (!preview) return;
    addItem({
      id: Date.now().toString(),
      title: preview.title || "Untitled",
      image: preview.image || "",
      price: preview.price,
      source: preview.siteName,
      createdAt: Date.now(),
      normalizedUrl: normalizeUrl(preview.sourceUrl),
    });
    setUrl("");
    setPreview(null);
    alert("Item added!");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={url}
        onChangeText={setUrl}
        placeholder="Paste URL here"
        style={styles.input}
      />
      <Button title="Fetch Preview" onPress={handleFetch} />

      {preview && (
        <View style={styles.preview}>
          <Image
            source={{ uri: preview.image || "https://via.placeholder.com/100" }}
            style={styles.image}
          />
          <Text style={styles.title}>{preview.title}</Text>
          <Text>{preview.price || "N/A"}</Text>
          <Text>{preview.siteName}</Text>
          <Button title="Add to Wishlist" onPress={handleSave} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
  },
  preview: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#111",
    borderRadius: 10,
  },
  image: { width: 100, height: 100, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "600", color: "#eee" },
});
