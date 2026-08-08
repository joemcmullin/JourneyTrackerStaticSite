import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Gallery from './components/Gallery'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import CtaBand from './components/CtaBand'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Gallery />
        <Pricing />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
