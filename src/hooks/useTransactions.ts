import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";

import { Transaction, TransactionCursor } from "@/database/schemas";
import { transactionService } from "@/services/transcation";

const PAGE_SIZE = 20;

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cursorRef = useRef<TransactionCursor | null>(null);
  const fetchingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const initializedRef = useRef(false);

  const fetchTransactions = useCallback(async (reset = false) => {
    if (fetchingRef.current) return;
    if (!reset && !hasMoreRef.current) return;

    fetchingRef.current = true;
    setError(null);

    try {
      if (reset) {
        if (initializedRef.current) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }
      } else {
        setLoadingMore(true);
      }

      const response = await transactionService.getTransactions({
        limit: PAGE_SIZE,
        cursor: reset ? null : cursorRef.current,
      });

      setTransactions((previous) =>
        reset ? response.data : [...previous, ...response.data],
      );

      cursorRef.current = response.nextCursor;
      hasMoreRef.current = response.hasMore;

      setHasMore(response.hasMore);
      initializedRef.current = true;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch transactions",
      );
    } finally {
      fetchingRef.current = false;

      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, []);

  const refresh = useCallback(() => {
    return fetchTransactions(true);
  }, [fetchTransactions]);

  const loadMore = useCallback(() => {
    if (!initializedRef.current) return;

    return fetchTransactions(false);
  }, [fetchTransactions]);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );
  const deleteTransaction = useCallback(async (id: number) => {
    setDeletingId(id);

    try {
      await transactionService.deleteTransaction(id);

      setTransactions((previous) =>
        previous.filter((transaction) => transaction.id !== id),
      );
    } finally {
      setDeletingId(null);
    }
  }, []);
  return {
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
  };
}
