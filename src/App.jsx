import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import ForArtisans from './pages/ForArtisans'
import Agent from './pages/Agent'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/for-artisans" element={<ForArtisans />} />
      </Route>
      <Route path="/agent" element={<Agent />} />
    </Routes>
  )
}