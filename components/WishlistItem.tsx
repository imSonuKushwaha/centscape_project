import { Image, StyleSheet, Text, View } from "react-native";
import { Item } from "../hooks/useWishlist";

type Props = { item: Item };

export default function WishlistItem({ item }: Props) {
  return (
    <View style={styles.itemRow}>
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/40" }}
        style={styles.itemImage}
      />
      <View style={{ flex: 1 }}>
        {/* show title (or brand+name if you split later) */}
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.source}>{item.source}</Text>
      </View>
      <Text style={styles.itemPrice}>
        {item.price ? `$${Number(item.price).toFixed(2)}` : "N/A"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemImage: { width: 40, height: 40, marginRight: 10, borderRadius: 8 },
  itemTitle: { fontWeight: "bold", fontSize: 14 },
  source: { fontSize: 12, color: "#555" },
  itemPrice: { fontWeight: "600", fontSize: 14 },
});
