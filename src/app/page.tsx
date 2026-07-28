import dynamic from "next/dynamic";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const BrandStory = dynamic(
  () =>
    import("@/components/BrandStory").then((m) => ({ default: m.BrandStory })),
  { ssr: true },
);
const ApartmentShowcase = dynamic(
  () =>
    import("@/components/ApartmentShowcase").then((m) => ({
      default: m.ApartmentShowcase,
    })),
  { ssr: true },
);
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
