import dynamic from "next/dynamic";
import { Preloader } from "@/components/Preloader";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BrandStory } from "@/components/BrandStory";
import { ApartmentShowcase } from "@/components/ApartmentShowcase";
import { Footer } from "@/components/Footer";

const VideoExperience = dynamic(
  () =>
    import("@/components/VideoExperience").then((m) => ({
      default: m.VideoExperience,
    })),
  { ssr: true },
);
const StayMoments = dynamic(
  () =>
    import("@/components/StayMoments").then((m) => ({
      default: m.StayMoments,
    })),
  { ssr: true },
);
const Amenities = dynamic(
  () =>
    import("@/components/Amenities").then((m) => ({ default: m.Amenities })),
  { ssr: true },
);
const Location = dynamic(
  () =>
    import("@/components/Location").then((m) => ({ default: m.Location })),
  { ssr: true },
);
const BookingFinale = dynamic(
  () =>
    import("@/components/BookingFinale").then((m) => ({
      default: m.BookingFinale,
    })),
  { ssr: true },
);

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
        <StayMoments />
        <Amenities />
        <Location />
        <BookingFinale />
      </main>
      <Footer />
    </>
  );
}
