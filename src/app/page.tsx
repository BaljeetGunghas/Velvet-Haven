import LandingBanner from "@/components/Banner/LandingBanner";
import OurServeces from "./LandingComponent/OurServeces";
import TopDestinationHotel from "./LandingComponent/TopDestinationHotel";
import Faq from "./LandingComponent/Faq";
import Testimonial from "./LandingComponent/Testimonial";

export default function Home() {
 
  return (
    <>
      <LandingBanner />
      <OurServeces />
      <TopDestinationHotel />
      <Testimonial />
      <Faq />
    </>
  );
}
