import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartSidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/contacto" element={<div className="max-w-7xl mx-auto px-4 py-12"><h1 className="text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-secondary)]">Contacto</h1></div>} />
            <Route path="*" element={<div className="max-w-7xl mx-auto px-4 py-12 text-center"><h1 className="text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-secondary)]">404 - No encontrado</h1></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
