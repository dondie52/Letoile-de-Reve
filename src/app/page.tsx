import { Preloader } from "@/components/Preloader";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BrandStory } from "@/components/BrandStory";
import { ApartmentShowcase } from "@/components/ApartmentShowcase";
import { VideoExperience } from "@/components/VideoExperience";
import { Amenities } from "@/components/Amenities";
import { Location } from "@/components/Location";
import { BookingFinale } from "@/components/BookingFinale";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Preloader />
      <Navigation />
      <main id="main-content">
        <Hero />
        <BrandStory />
        <ApartmentShowcase />
        <VideoExperience />
        <Amenities />
        <Location />
        <BookingFinale />
      </main>
      <Footer />
    </>
  );
}
