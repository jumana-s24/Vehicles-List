"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { InitialData } from "@/types/vehicle";
import { fetchVehicles } from "@/lib/fetchVehicles";

export function usePaginatedVehicles(
  initialData: InitialData,
  searchQuery: string,
  filter: string,
  sort: string
) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter, sort]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicles", currentPage, searchQuery, filter, sort],
    queryFn: () => fetchVehicles(currentPage, 10, searchQuery, filter, sort),
    initialData: currentPage === 1 ? initialData : undefined,
  });

  return { data, isLoading, error, currentPage, setCurrentPage };
}
