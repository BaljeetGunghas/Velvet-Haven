"use client";


import { useState, useEffect, useCallback, Suspense } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import SearchCard from "@/components/Card/SearchCard";
import LoadingComponent from "@/components/Loading/LoadingComponent";
import ComponentError from "@/components/Error/ComponentError";
import SearchFilter from "./Components/SearchFilter";
import dayjs from "dayjs";
import { FiFilter } from "react-icons/fi"; // Filter icon
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ButtonLoading from "@/components/Loading/ButtonLoading";
import { authHeader } from "../Auth/AuthHeader/authHeader";
import NoResultFound from "@/components/NoResultfound/NoResultFound";


export interface SearchRoomIF {
  amenities: string[] | null;
  image: string | null;
  _id: string;
  hotel_id: string;
  room_type: string;
  price_per_night: number;
  max_occupancy: number;
  bed_type: string;
  rating: number;
  is_shortlisted: boolean;
  check_in_time: string;
  check_out_time: string;
}

const SearchResult = () => {


  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <SearchResultContent />
      </Suspense>
    </>
  );
};

const SearchResultContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Toggle state for filter

  const [rooms, setRooms] = useState<SearchRoomIF[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState<number>(searchParams.get("page") ? parseInt(searchParams.get("page") as string, 10) : 1);
  const [totalPages, setTotalPages] = useState<number>(0);


  const initialFilters = {
    city: searchParams.get("city") || "delhi",
    check_in_date: searchParams.get("check_in_date") || "2025-03-19",
    check_out_date: searchParams.get("check_out_date") || "2025-03-20",
    adults: searchParams.get("adults") || "",
    children: searchParams.get("children") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    page: searchParams.get("page") || "1",
  };

  const [filters, setFilters] = useState(initialFilters);

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
        page: reset ? 1 : page,
      };

      const queryParams = new URLSearchParams({
        city: filters.city,
        check_in_date: dayjs(filters.check_in_date).format("YYYY-MM-DD"),
        check_out_date: dayjs(filters.check_out_date).format("YYYY-MM-DD"),
      });

      if (filters?.adults) {
        queryParams.append("adults", filters.adults.toString());
      }

      if (filters?.children) {
        queryParams.append("children", filters.children.toString());
      }
      queryParams.append("page", reset ? "1" : String(page));

      router.replace(`/SearchResult?${queryParams.toString()}`);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/search-room`,
        {
          params,
          headers: authHeader()
        },
      );

      const responseData = response.data;
      if (responseData.output > 0) {
        const availableRooms = responseData?.jsonResponse?.rooms || [];
        const totalPages = responseData?.jsonResponse?.totalPages || 1;

        setTotalPages(totalPages);
        setPage(responseData.jsonResponse?.currentPage + 1);

        setRooms((prevRooms) => {
          if (reset) return availableRooms;

          const uniqueRooms = new Map();
          [...prevRooms, ...availableRooms].forEach((room) => {
            uniqueRooms.set(room._id, room);
          });

          return Array.from(uniqueRooms.values());
        });
      } else {
        setRooms([]);
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to load rooms. Please try again.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page]);

  useEffect(() => {
    fetchRooms(true);
  }, []);

  const loadMore = () => {
    if (page <= totalPages) {
      fetchRooms();
    }
  };
  return (
    <div className="container mx-auto mt-20">
      <h1 className="mx-auto px-8 font-bold text-2xl text-center">Search Result</h1>

      {/* Filter Toggle Button (Mobile & Small Screens) */}
      <div className="container w-full md:w-1/4 justify-between px-8 pr-0 mt-4 flex">
        {isFilterOpen && (
          <Button className="flex items-center gap-2 dark:border px-4 py-2 rounded-md cursor-default">
            Filter
            <FiFilter size={20} />
          </Button>
        )}
        <Button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center dark:border gap-2 px-4 py-2 rounded-md ${isFilterOpen && "rounded-full"}`}
        >
          {isFilterOpen ? <ArrowLeft size={20} /> : <>Filter <ArrowRight size={20} /></>}
        </Button>
      </div>

      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {/* Filter Section */}
        {isFilterOpen && <motion.nav
          initial={{ x: -550 }}
          animate={{ x: isFilterOpen ? 0 : -550 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r bg-white`}
        >
          <div className="h-fit sticky top-20 overflow-y-auto  bg-white">
            <SearchFilter filters={filters} setfilter={setFilters} fetchRooms={(val) => fetchRooms(val)} />
          </div>
        </motion.nav>
        }

        {/* Room Listings */}
        <div className={`w-full ${!isFilterOpen ? "md:w-full" : "md:w-3/4"} px-2`}>
          {loading && rooms.length === 0 && <LoadingComponent />}
          {error && <ComponentError error={error} reload={() => { setPage(1); fetchRooms(true); }} />}
          {rooms.length === 0 && !loading && !error && <NoResultFound />}

          <div className={`grid grid-cols-1 sm:grid-cols-2 ${!isFilterOpen ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6`}>
            {rooms.map((room: SearchRoomIF) => (
              <SearchCard key={room._id} room={room} />
            ))}
          </div>

          {/* Load More Button */}
          {page <= totalPages && rooms.length >0 && !error && (
            <div className="text-center mt-6">
              <Button onClick={loadMore} disabled={loading} className="bg-primaryblue text-white">
                {loading ? <ButtonLoading /> : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResult;
