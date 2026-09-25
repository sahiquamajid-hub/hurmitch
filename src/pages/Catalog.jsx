import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Catalog() {
  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="font-heading text-3xl text-maroon mb-6">Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}