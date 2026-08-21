import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div><h1>Chamo Import</h1></div>} />
      <Route path="/catalogo" element={<div><h1>Catálogo</h1></div>} />
      <Route path="/producto/:id" element={<div><h1>Producto</h1></div>} />
      <Route path="/contacto" element={<div><h1>Contacto</h1></div>} />
      <Route path="*" element={<div><h1>404 - No encontrado</h1></div>} />
    </Routes>
  )
}

export default App
