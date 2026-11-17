"use client";


import { useState, useEffect, useCallback, Suspense, useRef } from "react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SearchResultContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
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
      // Store current scroll position before fetching
      const scrollBefore = window.scrollY;

      fetchRooms();

      // Scroll back to position after items load and animate
      setTimeout(() => {
        window.scrollTo({ top: scrollBefore + 300, behavior: 'smooth' });
      }, 800);  // Wait for API response and animations to complete
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 pt-20 sm:pt-24 lg:pt-28">
      {/* Main Content Section - Full Width Premium Layout */}
      <section className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-6xl mx-auto">
          {/* Page Heading - Top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 lg:mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-2">
              Luxury <span className="text-accent-gold">Stays</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-light">
              Discover our premium collection of hotels and resorts
            </p>
          </motion.div>

          {/* Filter Toggle Button (Mobile & Tablet) */}
          <div className="flex justify-between items-center mb-8 lg:hidden">
            {isFilterOpen && (
              <div className="flex items-center gap-2 text-accent-gold font-semibold">
                <FiFilter size={18} />
                Filters Active
              </div>
            )}
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-gold/50 bg-transparent hover:bg-accent-gold/5 text-accent-gold transition-all ${isFilterOpen ? 'gap-2' : 'gap-3'}`}
            >
              {isFilterOpen ? <ArrowLeft size={18} /> : <>Filter <ArrowRight size={18} /></>}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Filter Section - Sticky Sidebar (Desktop) */}
            <motion.aside
              initial={{ x: -550, opacity: 0 }}
              animate={{ x: isFilterOpen ? 0 : -550, opacity: isFilterOpen ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`${isFilterOpen ? 'block' : 'hidden lg:block'} w-full md:w-96 lg:w-80 flex-shrink-0`}
            >
              <div className="h-fit sticky top-32 overflow-y-auto pr-4 md:pr-6">
                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg p-7 hover:shadow-2xl hover:shadow-accent-gold/20 transition-all duration-300">
                  <h2 className="text-lg font-semibold text-primary-green dark:text-white mb-6 font-playfair">Refine Your Search</h2>
                  <SearchFilter filters={filters} setfilter={setFilters} fetchRooms={(val) => fetchRooms(val)} />
                </div>
              </div>
            </motion.aside>

            {/* Room Listings - Responsive Grid */}
            <div className="w-full flex-1">
              {loading && rooms.length === 0 && <LoadingComponent />}
              {error && <ComponentError error={error} reload={() => { setPage(1); fetchRooms(true); }} />}
              {rooms.length === 0 && !loading && !error && <NoResultFound />}

              {rooms.length > 0 && (
                <motion.div
                  ref={gridRef}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                  key={`grid-${rooms.length}`}
                >
                  {rooms.map((room: SearchRoomIF, index: number) => (
                    <motion.div
                      key={room._id}
                      variants={itemVariants}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <SearchCard room={room} />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Load More Button */}
              {page <= totalPages && rooms.length > 0 && !error && (
                <div className="text-center mt-12 lg:mt-16">
                  <Button
                    onClick={loadMore}
                    disabled={loading}
                    className="bg-accent-gold text-white hover:bg-accent-gold/90 px-8 lg:px-10 py-3 lg:py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-accent-gold/30"
                  >
                    {loading ? <ButtonLoading /> : "Load More Properties"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SearchResult;
