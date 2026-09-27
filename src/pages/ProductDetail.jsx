import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { products as sampleProducts } from '../data/products'

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadProduct = async () => {
            if (id.startsWith('live-')) {
                const realId = id.replace('live-', '')
                try {
                    const snap = await getDoc(doc(db, 'pendingListings', realId))
                    if (snap.exists()) {
                        const data = snap.data()
                        setProduct({
                            id,
                            name: data.itemName || 'Untitled Piece',
                            artisan: 'Hurmitch Artisan',
                            village: 'Mithi, Tharparkar',
                            price: data.price || '—',
                            artisanShare: 85,
                            image: data.photoUrl,
                            description: data.description || ''
                        })
                    }
                } catch (err) {
                    console.error('Failed to load live product:', err)
                }
            } else {
                const found = sampleProducts.find(p => p.id === Number(id))
                if (found) setProduct(found)
            }
            setLoading(false)
        }
        loadProduct()
    }, [id])

    if (loading) {
        return <div className="p-10 text-center">Loading...</div>
    }

    if (!product) {
        return (
            <div className="p-10 text-center">
                Product not found. <Link to="/catalog" className="text-terracotta">Back to Catalog</Link>
            </div>
        )
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

                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 bg-terracotta text-white px-6 py-3 rounded-lg font-semibold hover:bg-maroon transition-colors">
                        Order on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    )
}