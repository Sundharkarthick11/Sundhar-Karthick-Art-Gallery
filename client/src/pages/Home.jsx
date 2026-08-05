import Hero from "../components/Hero/Hero";
import FeaturedArtworks from "../components/FeaturedArtworks/FeaturedArtworks";
import Categories from "../components/Categories/Categories";
import About from "../components/About/About";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedArtworks />
      <Categories />
      <About />
    </>
  );
}