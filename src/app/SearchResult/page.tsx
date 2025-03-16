"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export interface SearchRoomIF {
  amenities: string[] | null;
  image: string | null;
  _id: string;
  room_type: string;
  price_per_night: number;
  max_occupancy: number;
  bed_type: string;
  rating: number;
  check_in_time: string;
  check_out_time: string;
}

const SearchResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [rooms, setRooms] = useState<SearchRoomIF[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Extract values from URL params
  const initialFilters = {
    city: searchParams.get("city") || "delhi",
    check_in_date: searchParams.get("check_in_date") || "2025-03-19",
    check_out_date: searchParams.get("check_out_date") || "2025-03-20",
    adults: searchParams.get("adults") || "",
    children: searchParams.get("children") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  };

  const [filters, setFilters] = useState(initialFilters);

  // Function to update URL parameters dynamically
  const updateQueryParams = (updatedFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });

    router.push(`?${params.toString()}`);
  };

  // Handle input change and update URL params
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    updateQueryParams(updatedFilters);
  };

  // Fetch rooms data
  const fetchRooms = useCallback(async (reset = false) => {
    setLoading(true);
    setError("");

    try {
      const params: Record<string, string | number> = {
        ...filters,
        ...(filters.minPrice && filters.maxPrice
          ? { minPrice: filters.minPrice, maxPrice: filters.maxPrice }
          : {}),
        ...(filters.children ? { children: filters.children } : {}),
        page,
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/search-room`,
        { params }
      );

      const availableRooms = response.data?.jsonResponse?.rooms || [];
      const totalPages = response.data?.jsonResponse?.totalPages || 1;

      setTotalPages(totalPages);

      setRooms((prevRooms) => {
        if (reset) return availableRooms;

        const uniqueRooms = new Map();
        [...prevRooms, ...availableRooms].forEach((room) => {
          uniqueRooms.set(room._id, room);
        });

        return Array.from(uniqueRooms.values());
      });

    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to load rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filters, page]);



  useEffect(() => {
    // setPage(1)
    fetchRooms(true); // Fetch new results on filter change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Load more function
  const loadMore = () => {
    if (page <= totalPages) {
      setPage((prevPage) => prevPage + 1);
      fetchRooms();
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row py-20">
      {/* Filter Section */}
      <div className="w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r">
        <h3 className="text-lg font-semibold mb-2">Filters</h3>
        <Input name="city" type="text" placeholder="Enter city..." value={filters.city} onChange={handleChange} className="mb-4" />
        <Input name="check_in_date" type="date" value={filters.check_in_date} onChange={handleChange} className="mb-4" />
        <Input name="check_in_date" type="date" value={filters.check_in_date} onChange={handleChange} className="mb-4" />
        <Input name="adults" type="number" placeholder="Adults" value={filters.adults} onChange={handleChange} className="mb-4" />
        <Input name="children" type="number" placeholder="Children" value={filters.children} onChange={handleChange} className="mb-4" />
        <Input name="minPrice" type="number" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} className="mb-4" />
        <Input name="maxPrice" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} className="mb-4" />
        <Button onClick={() => fetchRooms(true)} className="w-full">
          Search
        </Button>
      </div>

      {/* Room Listings */}
      <div className="w-full md:w-3/4 p-4">
        {loading && <p className="text-center">Loading rooms...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {rooms.length === 0 && !loading && !error && <p className="text-center">No rooms found.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room: SearchRoomIF) => (
            <Card key={room._id} className="p-4 shadow-lg rounded-xl flex flex-col">
              <Image
                src={room.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${room.image}` : "/default-hotel.jpg"}
                alt={room._id || "Hotel Room"}
                width={240}
                height={160}
                className="w-full h-40 object-cover rounded-lg"
                loading="lazy"
              />
              <CardContent className="text-center">
                <h3 className="text-lg font-semibold">{room.room_type} - {room.bed_type}</h3>
                <p className="text-sm text-gray-500">Max: {room.max_occupancy} guests</p>
                <p className="text-xs text-gray-500">Amenities: {room.amenities?.join(", ") || "None"}</p>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <Star className="text-yellow-500" />
                  <span className="font-medium">{room.rating || "N/A"}</span>
                </div>
                <p className="text-lg font-bold">${room.price_per_night} / night</p>
                <Button onClick={() => router.push(`/room-details/${room._id}`)} className="mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {page <= totalPages && (
          <div className="text-center mt-6">
            <Button onClick={loadMore} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
