import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesBar from "./components/FeaturesBar";
import BestsellersSection from "./components/BestsellersSection";
import CategoriesSection from "./components/CategoriesSection";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>

      <main className="flex-1">
        <HeroSection />
        <FeaturesBar />
        <BestsellersSection />
        <CategoriesSection />
        <PromoBanner />
      </main>

    </>
  );
}
