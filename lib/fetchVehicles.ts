const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function fetchVehicles(
  page: number,
  limit: number = 10,
  searchQuery: string = "",
  filter: string = "",
  sort: string = ""
) {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: searchQuery,
      filter,
      sort,
    });

    const res = await fetch(`${BASE_URL}/api/vehicles?${queryParams}`);

    if (!res.ok) throw new Error("Failed to fetch vehicles");
    return res.json();
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return { data: [], totalPages: 1 };
  }
}
