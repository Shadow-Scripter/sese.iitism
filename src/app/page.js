import NavBar from '@/components/NavBar/NavBar';
import Hero from '@/components/Hero/Hero';
import HomeAbout from '@/components/HomeAbout/HomeAbout';
import HomeEvents from '@/components/HomeEvents/HomeEvents';
import Gallery from '@/components/Gallery/Gallery';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <HomeAbout />
      <Gallery />
      <HomeEvents />
      <Footer />
    </main>
  );
}
