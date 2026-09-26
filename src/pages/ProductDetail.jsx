import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'

export default function ProductDetail() {
    const { id } = useParams()
    const product = products.find(p => p.id === Number(id))

    if (!product) {
        return <div className="p-10">Product not found. <Link to="/catalog" className="text-terracotta">Back to Catalog</Link></div>
    }

    const whatsappMessage = encodeURIComponent(`Hi! I'm interested in ${product.name} — is it available?`)
    const whatsappLink = `https://wa.me/923000000000?text=${whatsappMessage}`

    return (
        <div className="px-6 py-10 max-w-4xl mx-auto">
            <Link to="/catalog" className="text-terracotta hover:text-maroon font-medium">
                ← Back to Catalog
            </Link>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                <img src={product.image} alt={product.name} className="w-full rounded-xl object-cover" />
                <div>
                    <h1 className="font-heading text-3xl text-maroon">{product.name}</h1>
                    <p className="text-charcoal/70 mt-1">{product.artisan} • {product.village}</p>
                    <p className="mt-4">{product.description}</p>

                    <div className="mt-6 p-4 bg-gold/10 border border-gold rounded-lg">
                        <p className="font-semibold text-maroon">Rs {product.price}</p>
                        <p className="text-sm text-charcoal/70 mt-1">
                            {product.artisanShare}% goes directly to the artisan — no middleman markup.
                        </p>
                    </div>

                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 bg-terracotta text-white px-6 py-3 rounded-lg font-semibold hover:bg-maroon transition-colors"
                    >
                        Order on WhatsApp
                    </a>
                </div>
            </div>
        </div >
    )
}