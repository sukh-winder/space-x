import { Launch } from "@/helper/types/launches";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { dedupeById } from "@/helper/common";
import { LaunchesPagination } from "@/helper/types/launchesPagination";
import Card from "../Card/Card";
import SearchBar from "../ui/SearchBar";
import { getSpaceXLaunches } from "./utils/apiServices";

// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PAGE_SIZE = 20;

export default function SpaceXList() {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const [spacexList, setSpacexList] = useState<Launch[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pagination, setPagination] = useState<LaunchesPagination>({
    page: 1,
    limit: PAGE_SIZE,
    sort: { date_unix: -1 },
    totalPages: 0,
    hasNextPage: false,
    nextPage: null,
  });

  const searchTimeoutRef = useRef<number | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  const renderItem = useCallback(({ item }: { item: Launch }) => {
    return <Card item={item} />;
  }, []);

  const ListFooterComponent = useCallback(() => {
    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" />
          <Text>Loading more...</Text>
        </View>
      );
    }

    if (!pagination.hasNextPage && spacexList.length > 0) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>No more items</Text>
        </View>
      );
    }

    return null;
  }, [loadingMore, pagination.hasNextPage, spacexList.length]);

  const fetchSpaceXData = useCallback(
    async (paginationOptions: LaunchesPagination, append: boolean = false) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      // for appropriate spinner:
      if (append) {
        setLoadingMore(true);
      } else if (refreshing) {
        setRefreshing(true); // if caller already set refreshing, leave it
      } else {
        setIsInitialLoading(true);
      }

      try {
        const options = {
          page: paginationOptions.page || 1,
          limit: paginationOptions.limit || PAGE_SIZE,
          sort: paginationOptions.sort || { date_unix: -1 },
        };
        const response = await getSpaceXLaunches({
          options,
        });

        if (response.status && response.data) {
          const newLaunches = (response.data.docs ?? []) as Launch[];

          setSpacexList((prev) =>
            append ? dedupeById([...prev, ...newLaunches]) : newLaunches
          );
          let paginationInfo = {
            page: response.data.page,
            limit: PAGE_SIZE,
            sort: options.sort,
            totalDocs: response.data.totalDocs,
            totalPages: response.data.totalPages,
            hasNextPage: response.data.hasNextPage,
            nextPage: response.data.nextPage,
          };
          setPagination(paginationInfo);
        } else {
          // Handle unsuccessful response
          if (!append) {
            setSpacexList([]);
            setPagination({
              page: 1,
              limit: PAGE_SIZE,
              sort: { date_unix: -1 },
              totalDocs: 0,
              totalPages: 0,
              hasNextPage: false,
              nextPage: null,
            });
          }
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch SpaceX data.");
        console.warn("Error fetching SpaceX data:", error);
        if (!append) {
          setSpacexList([]);
          setPagination({
            page: 1,
            limit: PAGE_SIZE,
            sort: { date_unix: -1 },
            totalDocs: 0,
            totalPages: 0,
            hasNextPage: false,
            nextPage: null,
          });
        }
      } finally {
        isFetchingRef.current = false;
        setRefreshing(false);
        setIsInitialLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [refreshing]
  );

  const loadMore = useCallback(() => {
    if (
      loadingMore ||
      !pagination.hasNextPage ||
      refreshing ||
      isInitialLoading ||
      isFetchingRef.current
    ) {
      return;
    }

    setLoadingMore(true);

    // If no spacexList (e.g., error), do nothing
    if (!spacexList || spacexList.length === 0) {
      setPagination({
        page: 1,
        limit: PAGE_SIZE,
        sort: { date_unix: -1 },
        totalDocs: 0,
        totalPages: 0,
        hasNextPage: false,
        nextPage: null,
      });
      return;
    }

    // small delay to show spinner and avoid too-fast re-renders
    setTimeout(() => {
      try {
        const nextPage = pagination.page + 1;

        if (pagination.hasNextPage) {
          fetchSpaceXData(
            {
              page: Number(nextPage),
              limit: pagination.limit,
              sort: pagination.sort,
            },
            true
          ); // append = true
        }
      } finally {
        setLoadingMore(false);
      }
    }, 250); // tiny debounce
  }, [
    loadingMore,
    pagination.hasNextPage,
    pagination.page,
    pagination.limit,
    pagination.sort,
    refreshing,
    isInitialLoading,
    spacexList,
    fetchSpaceXData,
  ]);

  const handlePullToRefresh = useCallback(() => {
    setSearchQuery("");
    setIsInitialLoading(true);
    setPagination({
      page: 1,
      limit: PAGE_SIZE,
      sort: { date_unix: -1 },
      totalDocs: 0,
      totalPages: 0,
      hasNextPage: false,
      nextPage: null,
    });

    fetchSpaceXData({
      page: 1,
      limit: PAGE_SIZE,
      sort: { date_unix: -1 },
    }); // Re-fetch data
  }, [fetchSpaceXData]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);

      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Debounce search
      searchTimeoutRef.current = setTimeout(() => {
        setIsInitialLoading(true);
        if (!query || query.trim() === "") {
          // If search query is empty, reset to first page of full data
          fetchSpaceXData({
            page: 1,
            limit: PAGE_SIZE,
            sort: { date_unix: -1 },
          });
          return;
        }

        const lowercaseQuery = query.toLowerCase();
        let currentList = [...spacexList];
        const filtered = currentList.filter((launch) =>
          launch.name.toLowerCase().includes(lowercaseQuery)
        );

        setSpacexList(filtered);
        setIsInitialLoading(false);
      }, 500);
    },
    [fetchSpaceXData, spacexList]
  );

  useEffect(() => {
    fetchSpaceXData({ page: 1, limit: PAGE_SIZE, sort: { date_unix: -1 } });
  }, [fetchSpaceXData]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search SpaceX launches..."
        value={searchQuery}
        onChange={(e) => handleSearch(e)}
      />
      <FlatList
        data={spacexList ?? []}
        renderItem={({ item, index }) => renderItem({ item })}
        keyExtractor={(item, index) =>
          item.id ? String(item.id) : String(index)
        }
        onEndReached={loadMore}
        // refreshing={refreshing}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handlePullToRefresh}
          />
        }
        initialNumToRender={PAGE_SIZE}
        maxToRenderPerBatch={PAGE_SIZE}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={!refreshing ? <Text>No data available</Text> : null}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  flatListContainer: {
    gap: 10,
  },
  listWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 8,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  launchName: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  launchDetails: {
    width: 200,
    color: "#666",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  itemContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 6,
    flexWrap: "wrap",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationLink: {
    alignItems: "flex-end",
  },
  footer: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    marginTop: 6,
  },
});
