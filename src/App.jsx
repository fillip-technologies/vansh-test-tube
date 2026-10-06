import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import DoctorProfile from './pages/DoctorProfile.jsx'
import Doctors from './pages/Doctors.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:slug" element={<DoctorProfile />} />
        <Route path="/contact" element={<Contact />} />
        {/* Treatments overview lives on the homepage */}
        <Route path="/treatments" element={<Navigate to="/#treatments" replace />} />
        {/* One master page for every treatment, driven by services.json */}
        <Route path="/treatments/:slug" element={<ServiceDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
