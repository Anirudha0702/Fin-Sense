import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { FontSize, FontWeight, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useTransactions } from "@/hooks/useTransactions";
import { MaterialIcons } from "@expo/vector-icons";
import TransactionCard from "@/components/TransactionCard";
import { useCallback } from "react";

export default function Transactions() {
  const { colors } = useTheme();

  const {
    transactions,
    loading,
    loadingMore,
    refreshing,
    hasMore,
    error,
    refresh,
    loadMore,
    deleteTransaction,
    deletingId,
  } = useTransactions();

  const handleDelete = useCallback(
    (id: number) => {
      Alert.alert(
        "Delete Transaction",
        "Are you sure you want to delete this transaction? This action cannot be undone.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await deleteTransaction(id);
              } catch (error) {
                Alert.alert(
                  "Unable to delete",
                  error instanceof Error
                    ? error.message
                    : "Failed to delete transaction.",
                );
              }
            },
          },
        ],
      );
    },
    [deleteTransaction],
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color={colors.accent}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {/* Header */}
      <View
        style={{
          padding: Spacing.md,
          gap: 4,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: FontSize.xl,
            fontWeight: FontWeight.bold,
          }}
        >
          Transactions
        </Text>

        <Text
          style={{
            color: `${colors.text}80`,
            fontSize: FontSize.sm,
          }}
        >
          Transaction history
        </Text>
      </View>

      <FlatList
        data={transactions}
        extraData={deletingId}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onDelete={handleDelete}
            deleting={deletingId === item.id}
          />
        )}
        contentContainerStyle={{
          padding: Spacing.md,
          paddingBottom: Spacing.lg,
          flexGrow: 1,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ height: Spacing.sm }} />
        )}
        showsVerticalScrollIndicator={false}

        // Pull to refresh
        refreshing={refreshing}
        onRefresh={refresh}

        // Infinite scrolling
        onEndReached={() => {
          if (
            hasMore &&
            !loadingMore &&
            !refreshing &&
            !error
          ) {
            void loadMore();
          }
        }}
        onEndReachedThreshold={0.4}

        // Empty state
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: Spacing.sm,
            }}
          >
            <MaterialIcons
              name="receipt-long"
              size={56}
              color={colors.border}
            />

            <Text
              style={{
                color: colors.text,
                fontSize: FontSize.lg,
                fontWeight: FontWeight.bold,
              }}
            >
              {error
                ? "Something went wrong"
                : "No transactions yet"}
            </Text>

            <Text
              style={{
                color: `${colors.text}80`,
                textAlign: "center",
              }}
            >
              {error ??
                "Your transactions will appear here."}
            </Text>

            {error && (
              <Pressable onPress={refresh}>
                <Text style={{ color: colors.accent }}>
                  Try again
                </Text>
              </Pressable>
            )}
          </View>
        }

        // Pagination footer
        ListFooterComponent={
          transactions.length > 0 ? (
            <View
              style={{
                alignItems: "center",
                paddingVertical: Spacing.lg,
              }}
            >
              {loadingMore ? (
                <ActivityIndicator
                  color={colors.accent}
                />
              ) : error ? (
                <Pressable onPress={loadMore}>
                  <Text style={{ color: colors.error }}>
                    Failed to load. Tap to retry.
                  </Text>
                </Pressable>
              ) : !hasMore ? (
                <Text
                  style={{
                    color: `${colors.text}60`,
                    fontSize: FontSize.sm,
                  }}
                >
                  You've reached the end
                </Text>
              ) : null}
            </View>
          ) :<Text>No </Text>
        }
      />
    </View>
  );
}