import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/api';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos: ' + err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/products`, {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price)
      });
      setNewProduct({ name: '', description: '', price: '' });
      fetchProducts();
    } catch (err) {
      setError('Error al crear el producto: ' + err.message);
      console.error('Error creating product:', err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/products/${editingProduct.id}`, {
        name: editingProduct.name,
        description: editingProduct.description,
        price: parseFloat(editingProduct.price)
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      setError('Error al actualizar el producto: ' + err.message);
      console.error('Error updating product:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        fetchProducts();
      } catch (err) {
        setError('Error al eliminar el producto: ' + err.message);
        console.error('Error deleting product:', err);
      }
    }
  };

  if (loading) return <div className="loading">Cargando productos...</div>;

  return (
    <div className="app">
      <header>
        <h1>🛍️ API Demo - Productos</h1>
        <p>React + Vite + .NET 8 + Traefik</p>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="container">
        <section className="form-section">
          <h2>➕ Crear Producto</h2>
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Nombre"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
            <button type="submit">Crear Producto</button>
          </form>
        </section>

        {editingProduct && (
          <section className="form-section editing">
            <h2>✏️ Editar Producto</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Nombre"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Descripción"
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Precio"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                required
              />
              <div className="button-group">
                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => setEditingProduct(null)} className="cancel">
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="products-section">
          <h2>📦 Lista de Productos</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="date">Creado: {new Date(product.createdAt).toLocaleDateString()}</p>
                <div className="button-group">
                  <button onClick={() => setEditingProduct(product)} className="edit">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="delete">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
