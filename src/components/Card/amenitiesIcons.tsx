import { 
  Wifi, Snowflake, Tv, Coffee, UtensilsCrossed, Bell, ShowerHead, 
  Thermometer, Wind, Lock, Home, Building, Landmark, Mountain, Waves, 
  Dumbbell, HeartPulse, ConciergeBell, ParkingSquare, Dog, Cigarette, 
  Briefcase, Bus, Flame, ShieldCheck, BedDouble, Fan, AlarmCheck, 
  UserCheck, Baby, ShoppingBag, Droplet, Package 
} from "lucide-react";

export const amenitiesIcons = {
  free_wifi: <Wifi className=" text-primary" />,
  air_conditioning: <Snowflake className=" text-primary" />,
  television: <Tv className=" text-primary" />,
  mini_bar: <UtensilsCrossed className=" text-primary" />,
  tea_coffee_maker: <Coffee className=" text-primary" />,
  room_service: <Bell className=" text-primary" />,
  private_bathroom: <ShowerHead className=" text-primary" />,
  hot_water: <Thermometer className=" text-primary" />,
  hair_dryer: <Wind className=" text-primary" />,
  iron_ironing_board: <ShieldCheck className=" text-primary" />,
  safe_deposit_box: <Lock className=" text-primary" />,
  balcony: <Home className=" text-primary" />,
  city_view: <Building className=" text-primary" />,
  sea_view: <Waves className=" text-primary" />,
  mountain_view: <Mountain className=" text-primary" />,
  swimming_pool: <Landmark className=" text-primary" />,
  gym: <Dumbbell className=" text-primary" />,
  spa: <HeartPulse className=" text-primary" />,
  front_desk: <ConciergeBell className=" text-primary" />,
  laundry_service: <ShoppingBag className=" text-primary" />, // Used "ShoppingBag" as a laundry alternative
  free_parking: <ParkingSquare className=" text-primary" />,
  pet_friendly: <Dog className=" text-primary" />,
  non_smoking: <UserCheck className=" text-primary" />, // No "NoSmoking" in Lucide, using "UserCheck"
  smoking_room: <Cigarette className=" text-primary" />,
  wheelchair_accessible: <UserCheck className=" text-primary" />, // No "Wheelchair" in Lucide, using "UserCheck"
  restaurant: <UtensilsCrossed className=" text-primary" />,
  bar_lounge: <Briefcase className=" text-primary" />,
  conference_room: <Building className=" text-primary" />,
  kids_play_area: <Baby className=" text-primary" />, // Used "Baby" for kids' area
  airport_shuttle: <Bus className=" text-primary" />,
  electric_kettle: <Flame className=" text-primary" />, // No "Kettle", used "Flame"
  fireplace: <Flame className=" text-primary" />,
  smart_tv: <Tv className=" text-primary" />,
  soundproof_rooms: <ShieldCheck className=" text-primary" />,
  extra_bed: <BedDouble className=" text-primary" />,
  fan: <Fan className=" text-primary" />,
  bottled_water: <Droplet className=" text-primary" />, // Used "Droplet" for water
  luggage_storage: <Package className=" text-primary" />, // Used "Package" for luggage
  wake_up_service: <AlarmCheck className=" text-primary" />,
};
