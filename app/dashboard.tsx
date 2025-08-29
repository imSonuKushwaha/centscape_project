import { Link } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard() {
  const goal = 499.99;
  const saved = 125;
  const remaining = goal - saved;
  const estimatedDays = 58; // hardcoded for now

  const wishlist = [
    {
      id: "1",
      brand: "Apple",
      name: "Airpods Max- Midnight",
      price: 499.99,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "2",
      brand: "Zara",
      name: "Stretch Bandeau top",
      price: 79.99,
      image: "https://via.placeholder.com/40",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.header}>MY DASHBOARD</Text>
      </View>

      {/* Progress card */}
      <View style={styles.progressCard}>
        <Text style={styles.progressText}>You have saved ${saved}</Text>
        <ProgressBar saved={saved} goal={goal} />
        <View style={styles.remainingBox}>
          <Text style={styles.remainingText}>
            ${remaining.toFixed(2)} to go
          </Text>
        </View>
      </View>

      {/* Wishlist */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionText}>MY WISHLIST</Text>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemBrand}>{item.brand}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        )}
        ListFooterComponent={
          <Link href="/add-item" asChild>
            <TouchableOpacity style={styles.addRow}>
              <Text style={styles.addText}>
                + Add items to your Centscape Wishlist
              </Text>
            </TouchableOpacity>
          </Link>
        }
      />

      {/* Motivation text */}
      <Text style={styles.motivation}>
        Keep going! According to your spending habits you will reach your goal
        of ${goal} in
      </Text>
      <Text style={styles.days}>{estimatedDays} DAYS!</Text>

      {/* Bottom Nav (dummy for now) */}
      <View style={styles.bottomNav}>
        <View style={styles.navIcon} />
        <View style={styles.navIcon} />
        <View style={styles.navIcon} />
        <View style={styles.navIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E6F9E6", padding: 16 },
  headerBox: {
    alignSelf: "flex-start",
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  header: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  progressText: { color: "green", fontWeight: "500", marginBottom: 8 },
  remainingBox: {
    alignSelf: "flex-end",
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  remainingText: { color: "#fff", fontSize: 12 },
  sectionHeader: {
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
  sectionText: { color: "#fff", fontWeight: "bold" },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemImage: { width: 40, height: 40, marginRight: 10, borderRadius: 8 },
  itemBrand: { fontWeight: "bold" },
  itemName: { fontSize: 12, color: "#555" },
  itemPrice: { fontWeight: "600" },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  addText: { fontSize: 14, color: "#000" },
  motivation: { textAlign: "center", marginTop: 20, fontSize: 14 },
  days: { textAlign: "center", fontSize: 18, fontWeight: "bold", marginTop: 6 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    marginTop: "auto",
  },
  navIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#333",
    borderRadius: 10,
  },
});
