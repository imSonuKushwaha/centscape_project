import { StyleSheet, View } from "react-native";

type Props = { saved: number; goal: number };

export default function ProgressBar({ saved, goal }: Props) {
  const progress = Math.min(saved / goal, 1);

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { flex: progress }]} />
      <View style={{ flex: 1 - progress }} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  fill: {
    backgroundColor: "#4CAF50",
  },
});
