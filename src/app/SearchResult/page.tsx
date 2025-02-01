'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';
import hotel1 from '@/asset/dummy/hotel1.jpeg';

const dummyHotels = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'New York, USA',
    rating: 4.5,
    price: 200,
    image: hotel1,
  },
  {
    id: 2,
    name: 'Seaside Resort',
    location: 'Malibu, USA',
    rating: 4.8,
    price: 350,
    image: hotel1,
  },
  {
    id: 3,
    name: 'Mountain Retreat',
    location: 'Aspen, USA',
    rating: 4.7,
    price: 280,
    image: hotel1,
  },
];

const SearchResult = () => {
  const [hotels, setHotels] = useState(dummyHotels);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = (!minPrice || hotel.price >= parseInt(minPrice)) && (!maxPrice || hotel.price <= parseInt(maxPrice));
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row py-20 ">
      {/* Filter Section */}
      <div className="w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r">
        <h3 className="text-lg font-semibold mb-2">Filters</h3>
        <Input
          type="text"
          placeholder="Search hotels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <Input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="mb-4"
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="mb-4"
        />
      </div>
      
      {/* Hotel Listings */}
      <div className="w-full md:w-3/4 p-4">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="flex flex-col md:flex-row items-center p-4 shadow-lg rounded-xl mb-4">
            <Image 
              src={hotel.image} 
              alt={hotel.name} 
              className="w-full md:w-40 h-32 object-cover rounded-lg" 
              loading="lazy"
            />
            <CardContent className="mt-4 md:mt-0 md:ml-4 flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-500">{hotel.location}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 my-2">
                <Star className="text-yellow-500" />
                <span className="font-medium">{hotel.rating}</span>
              </div>
              <p className="text-lg font-bold">${hotel.price} / night</p>
            </CardContent>
            <Button className="w-full md:w-auto mt-4 md:mt-0 md:ml-auto">View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;