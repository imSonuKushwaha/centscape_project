import WishlistItem from "@/components/WishlistItem";
import { useWishlist } from "@/hooks/useWishlist";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect } from "react";
import {
  FlatList,
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
  const estimatedDays = 58;

  const { items, loadItems } = useWishlist();

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const previewItems = items.slice(0, 2);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.header}>MY DASHBOARD</Text>
      </View>

      {/* Progress card */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Your progress</Text>
          <Text style={styles.goalLabel}>Goal ${goal.toFixed(2)}</Text>
        </View>

        <Text style={styles.savedText}>You have saved ${saved}</Text>

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
        data={previewItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WishlistItem item={item} />}
        ListFooterComponent={
          <Link href="/wishlist" asChild>
            <TouchableOpacity style={styles.addRow}>
              <View style={styles.addIcon}>
                <Ionicons name="add" size={18} color="#fff" />
              </View>
              <Text style={styles.addText}>
                Add items to your Centscape Wishlist
              </Text>
            </TouchableOpacity>
          </Link>
        }
      />

      {/* Motivation text */}
      <View style={styles.motivationBox}>
        <Text style={styles.motivation}>
          Keep going! According to your spending habits you will reach your goal
          of ${goal} in
        </Text>
        <Text style={styles.days}>{estimatedDays} DAYS!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E6F9E6", padding: 16 },

  // Header
  headerBox: {
    alignSelf: "flex-start",
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 16,
  },
  header: { color: "#fff", fontWeight: "bold", fontSize: 20 },

  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  progressLabel: {
    fontSize: 13,
    color: "#888", // lighter gray
  },

  goalLabel: {
    fontSize: 13,
    color: "#555", // darker gray
  },

  savedText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3CB371", // green like in design
    marginBottom: 8,
  },

  remainingBox: {
    position: "absolute",
    bottom: -12,
    right: 16,
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  remainingText: {
    color: "#3CB371", // green text inside black chip
    fontSize: 12,
    fontWeight: "600",
  },

  // Wishlist section
  sectionHeader: {
    alignSelf: "flex-start", // ✅ prevent full width
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 12,
  },
  sectionText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  addRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
  },
  addIcon: {
    width: 52,
    height: 52,
    borderRadius: 100,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: { fontSize: 14, color: "#000", fontWeight: "500" },

  // Motivation text
  motivationBox: { marginTop: 24, alignItems: "center" },
  motivation: { textAlign: "center", fontSize: 14 },
  days: { textAlign: "center", fontSize: 18, fontWeight: "bold", marginTop: 6 },
});
