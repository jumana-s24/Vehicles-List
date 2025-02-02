"use client";

import { useState } from "react";
import VehicleCard from "./VehicleCard";
import { InitialData, Vehicle } from "@/types/vehicle";
import { usePaginatedVehicles } from "@/hooks/usePaginatedVehicles";
import { useDebounce } from "@/hooks/useDebounce";
import { motion } from "framer-motion";
import Spinner from "../ ui/Spinner";

const SORT_OPTIONS = [
  { value: "", label: "Sort by" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "year-desc", label: "Year (Newest First)" },
  { value: "year-asc", label: "Year (Oldest First)" },
];

export default function VehiclesList({
  initialData,
}: {
  initialData: InitialData;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, currentPage, setCurrentPage } = usePaginatedVehicles(
    initialData,
    debouncedSearch,
    filter,
    sortOption
  );

  const resetFilters = () => {
    setSearch("");
    setFilter("");
    setSortOption("");
  };

  if (isLoading) return <Spinner aria-live="polite" aria-busy="true" />;

  return (
    <main
      className="container mx-auto min-h-screen py-20 px-10 md:px-4"
      role="main"
    >
      <h1 className="text-4xl font-bold mb-20 text-center">
        Electric Vehicles List
      </h1>

      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4"
        role="search"
      >
        <div className="w-full md:w-[400px]">
          <input
            type="text"
            placeholder="Search by brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-md w-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex w-full md:w-[400px] gap-4">
          <div className="w-full md:flex-1">
            <select
              data-testid="filter"
              aria-label="Filter by Condition"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Filter by Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <div className="w-full md:flex-1">
            <select
              data-testid="sort"
              aria-label="Sort by"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={resetFilters}
          className="text-blue-500 hover:text-blue-700 underline focus:outline-none"
          title="Reset search, filter, and sort by"
        >
          Reset
        </button>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-live="polite"
        aria-relevant="additions removals"
        className={`${
          data?.data.length === 0
            ? "flex justify-center items-center h-[300px]"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        }`}
      >
        {data?.data.length === 0 ? (
          <p role="alert" className="text-center text-gray-700 text-2xl">
            No vehicles found
          </p>
        ) : (
          data?.data.map((vehicle: Vehicle, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <VehicleCard key={index} vehicle={vehicle} />
            </motion.div>
          ))
        )}
      </motion.section>

      {data?.data.length > 0 && data.totalPages > 1 && (
        <nav
          className="flex justify-center items-center gap-4 mt-20"
          aria-label="Pagination Navigation"
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || data?.data.length === 0}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go to previous page"
          >
            Prev
          </button>
          <span aria-live="polite" className="font-medium">
            Page {currentPage} of {data.totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, data.totalPages))
            }
            disabled={currentPage === data.totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go to next page"
          >
            Next
          </button>
        </nav>
      )}
    </main>
  );
}
