import { 
  Wifi, Snowflake, Tv, Coffee, UtensilsCrossed, Bell, ShowerHead, 
  Thermometer, Wind, Lock, Home, Building, Landmark, Mountain, Waves, 
  Dumbbell, HeartPulse, ConciergeBell, ParkingSquare, Dog, Cigarette, 
  Briefcase, Bus, Flame, ShieldCheck, BedDouble, Fan, AlarmCheck, 
  UserCheck, Baby, ShoppingBag, Droplet, Package 
} from "lucide-react";

export const amenitiesIcons = {
  free_wifi: <Wifi className=" w-4 h-4 text-primary" />,
  air_conditioning: <Snowflake className=" w-4 h-4 text-primary" />,
  television: <Tv className=" w-4 h-4 text-primary" />,
  mini_bar: <UtensilsCrossed className=" w-4 h-4 text-primary" />,
  tea_coffee_maker: <Coffee className=" w-4 h-4 text-primary" />,
  room_service: <Bell className=" w-4 h-4 text-primary" />,
  private_bathroom: <ShowerHead className=" w-4 h-4 text-primary" />,
  hot_water: <Thermometer className=" w-4 h-4 text-primary" />,
  hair_dryer: <Wind className=" w-4 h-4 text-primary" />,
  iron_ironing_board: <ShieldCheck className=" w-4 h-4 text-primary" />,
  safe_deposit_box: <Lock className=" w-4 h-4 text-primary" />,
  balcony: <Home className=" w-4 h-4 text-primary" />,
  city_view: <Building className=" w-4 h-4 text-primary" />,
  sea_view: <Waves className=" w-4 h-4 text-primary" />,
  mountain_view: <Mountain className=" w-4 h-4 text-primary" />,
  swimming_pool: <Landmark className=" w-4 h-4 text-primary" />,
  gym: <Dumbbell className=" w-4 h-4 text-primary" />,
  spa: <HeartPulse className=" w-4 h-4 text-primary" />,
  front_desk: <ConciergeBell className=" w-4 h-4 text-primary" />,
  laundry_service: <ShoppingBag className=" w-4 h-4 text-primary" />, // Used "ShoppingBag" as a laundry alternative
  free_parking: <ParkingSquare className=" w-4 h-4 text-primary" />,
  pet_friendly: <Dog className=" w-4 h-4 text-primary" />,
  non_smoking: <UserCheck className=" w-4 h-4 text-primary" />, // No "NoSmoking" in Lucide, using "UserCheck"
  smoking_room: <Cigarette className=" w-4 h-4 text-primary" />,
  wheelchair_accessible: <UserCheck className=" w-4 h-4 text-primary" />, // No "Wheelchair" in Lucide, using "UserCheck"
  restaurant: <UtensilsCrossed className=" w-4 h-4 text-primary" />,
  bar_lounge: <Briefcase className=" w-4 h-4 text-primary" />,
  conference_room: <Building className=" w-4 h-4 text-primary" />,
  kids_play_area: <Baby className=" w-4 h-4 text-primary" />, // Used "Baby" for kids' area
  airport_shuttle: <Bus className=" w-4 h-4 text-primary" />,
  electric_kettle: <Flame className=" w-4 h-4 text-primary" />, // No "Kettle", used "Flame"
  fireplace: <Flame className=" w-4 h-4 text-primary" />,
  smart_tv: <Tv className=" w-4 h-4 text-primary" />,
  soundproof_rooms: <ShieldCheck className=" w-4 h-4 text-primary" />,
  extra_bed: <BedDouble className=" w-4 h-4 text-primary" />,
  fan: <Fan className=" w-4 h-4 text-primary" />,
  bottled_water: <Droplet className=" w-4 h-4 text-primary" />, // Used "Droplet" for water
  luggage_storage: <Package className=" w-4 h-4 text-primary" />, // Used "Package" for luggage
  wake_up_service: <AlarmCheck className=" w-4 h-4 text-primary" />,
};
