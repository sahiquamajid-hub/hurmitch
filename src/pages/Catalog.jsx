import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { products as sampleProducts } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Catalog() {
  const [liveProducts, setLiveProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(collection(db, 'pendingListings'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const fetched = snapshot.docs.map(doc => ({
          id: `live-${doc.id}`,
          name: doc.data().itemName || 'Untitled Piece',
          artisan: 'Hurmitch Artisan',
          village: 'Mithi, Tharparkar',
          price: doc.data().price || '—',
          artisanShare: 85,
          image: doc.data().photoUrl,
          description: doc.data().description || ''
        }))
        setLiveProducts(fetched)
      } catch (err) {
        console.error('Failed to fetch live listings:', err)
      }
      setLoading(false)
    }
    fetchListings()
  }, [])

  // Filter out the two specific items by their names
  const allProducts = [...liveProducts, ...sampleProducts].filter(
    product => product.name !== 'Untitled Piece' && product.name !== 'Mirror-Work Wall Hanging'
  )

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="font-heading text-3xl text-maroon mb-6">Catalog</h1>
      {loading ? (
        <p className="text-charcoal/60">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}