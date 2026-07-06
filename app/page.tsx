import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Expertise from '@/components/Expertise';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Experience limit={4} />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
