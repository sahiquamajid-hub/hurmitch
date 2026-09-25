import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
    return (
        <Link
            to={`/product/${product.id}`}
            className="block bg-white/40 rounded-xl overflow-hidden border border-maroon/10 hover:border-terracotta transition-colors"
        >
            <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
            <div className="p-4">
                <h3 className="font-heading text-lg text-maroon">{product.name}</h3>
                <p className="text-sm text-charcoal/70">{product.artisan} • {product.village}</p>
                <p className="mt-2 font-semibold text-terracotta">Rs {product.price}</p>
            </div>
        </Link>
    )
}