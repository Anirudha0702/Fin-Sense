import { StyleSheet, Text, View } from "react-native";

type Props = {
  budget: number;
  spent: number;
};

export default function BudgetProgressBar({ budget, spent }: Props) {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;
  
  const progress = Math.min(Math.max(percentage, 0), 100);

  const progressColor =
    percentage >= 100 ? "#EF4444" : percentage >= 80 ? "#F59E0B" : "#10B981";

  const remaining = budget - spent;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress}%`,
              backgroundColor: progressColor,
            },
          ]}
        />
      </View>

      <View style={styles.details}>
        <Text style={{ color: progressColor }}>
          {percentage.toFixed(0)}% used
        </Text>

        <Text style={styles.remaining}>
          ₹{Math.abs(remaining).toLocaleString("en-IN")}
          {remaining < 0 ? " over budget" : " remaining"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: "100%",
  },
  track: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  remaining: {
    fontSize: 12,
    color: "#6B7280",
  },
});
