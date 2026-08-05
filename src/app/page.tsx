import dynamic from "next/dynamic";
import { Preloader } from "@/components/Preloader";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const BrandStory = dynamic(
  () =>
    import(/* webpackPrefetch: false */ "@/components/BrandStory").then(
      (m) => ({ default: m.BrandStory }),
    ),
  { ssr: true },
);
const ApartmentShowcase = dynamic(
  () =>
    import(/* webpackPrefetch: false */ "@/components/ApartmentShowcase").then(
      (m) => ({
        default: m.ApartmentShowcase,
      }),
    ),
  { ssr: true },
);
const VideoExperience = dynamic(
  () =>
    import(/* webpackPrefetch: false */ "@/components/VideoExperience").then(
      (m) => ({
        default: m.VideoExperience,
      }),
    ),
  { ssr: true },
);
const StayMoments = dynamic(
  () =>
    import(/* webpackPrefetch: false */ "@/components/StayMoments").then(
      (m) => ({
        default: m.StayMoments,
      }),
    ),
  { ssr: true },
);
const Amenities = dynamic(
  () =>
    import(/* webpackPrefetch: false */ "@/components/Amenities").then((m) => ({
      default: m.Amenities,
    })),
  { ssr: true },
);
const RatesOffer = dynamic(
  () =>
    import(/* webpackPrefetch: false */ "@/components/RatesOffer").then((m) => ({
      default: m.RatesOffer,
    })),
  { ssr: true },
);
const Location = dynamic(
  () =>
    import(/* webpackPrefetch: false */ "@/components/Location").then((m) => ({
      default: m.Location,
    })),
  { ssr: true },
);
const BookingFinale = dynamic(
  () =>
    import(/* webpackPrefetch: false */ "@/components/BookingFinale").then(
      (m) => ({
        default: m.BookingFinale,
      }),
    ),
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
        <RatesOffer />
        <Location />
        <BookingFinale />
      </main>
      <Footer />
    </>
  );
}
