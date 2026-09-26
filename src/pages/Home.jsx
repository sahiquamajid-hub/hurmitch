import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
    const featured = products.slice(0, 3)

    return (
        <div>
            {/* Hero */}
            <section className="px-6 py-24 text-center bg-sand">
                <h1 className="font-heading text-4xl md:text-5xl text-maroon font-bold">
                    Hurmitch
                </h1>
                <p className="mt-4 text-lg text-charcoal/80 max-w-2xl mx-auto">
                    An interactive digital archive bridging local craft ecosystems with modern web infrastructure.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link to="/catalog" className="bg-terracotta text-white px-6 py-3 rounded-lg font-semibold hover:bg-maroon transition-colors">
                        Browse the Catalog
                    </Link>
                    <Link to="/for-artisans" className="border border-maroon text-maroon px-6 py-3 rounded-lg font-semibold hover:bg-maroon hover:text-white transition-colors">
                        For Artisans
                    </Link>
                </div>
            </section>

            {/* The Problem */}
            <section className="px-6 py-16 max-w-3xl mx-auto text-center">
                <h2 className="font-heading text-2xl text-maroon">The Problem</h2>
                <p className="mt-4 text-charcoal/80">
                    Karhai artisans in Mithi and across Tharparkar produce internationally recognized
                    mirror-work embroidery, but sell almost entirely through local middlemen who take
                    the largest share of the profit. These artisans have no direct way to reach buyers
                    in Karachi, Lahore, or abroad who would pay real prices for authentic handwork.
                </p>
            </section>

            {/* Featured Products */}
            <section className="px-6 py-16 bg-ink/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-heading text-2xl text-maroon text-center mb-10">Featured Work</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featured.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="px-6 py-16 max-w-5xl mx-auto">
                <h2 className="font-heading text-2xl text-maroon text-center mb-10">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-gold text-center mb-4">For Buyers</p>
                        <div className="space-y-4 text-center">
                            <div>
                                <div className="text-2xl mb-1">🛍️</div>
                                <p className="font-semibold text-maroon">Browse the Catalog</p>
                                <p className="text-sm text-charcoal/70">See real work, real artisans, real villages.</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">💬</div>
                                <p className="font-semibold text-maroon">Order on WhatsApp</p>
                                <p className="text-sm text-charcoal/70">Message the artisan directly — no middleman.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-terracotta text-center mb-4">For Artisans</p>
                        <div className="space-y-4 text-center">
                            <div>
                                <div className="text-2xl mb-1">📷🎙️</div>
                                <p className="font-semibold text-maroon">Send a Photo & Voice Note</p>
                                <p className="text-sm text-charcoal/70">Describe the piece, time taken, and price.</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">✅</div>
                                <p className="font-semibold text-maroon">Confirm the Listing</p>
                                <p className="text-sm text-charcoal/70">A drafted listing is confirmed before it goes live.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}