import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'

export default function Home() {
    const featured = products.slice(0, 3)

    return (
        <div>
            {/* ================= HERO — framed spin video, sand backdrop, warm glow ================= */}
            <section className="relative w-full px-6 py-16 md:py-24 overflow-hidden bg-sand">
                {/* Warm ambient glow behind the video frame */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px]
                                    bg-gold/25 rounded-full blur-3xl animate-blob" />
                    <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-terracotta/20 rounded-full blur-3xl
                                    animate-blob animation-delay-2000" />
                    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-maroon/15 rounded-full blur-3xl
                                    animate-blob animation-delay-4000" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
                    {/* Kicker pill */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="mb-7 inline-flex items-center gap-2 px-4 py-2 rounded-full
                                   bg-white/70 backdrop-blur-md border border-maroon/15
                                   text-maroon/80 text-xs md:text-sm tracking-wide shadow-sm"
                    >
                        Handstitched in Mithi, Tharparkar
                    </motion.div>

                    {/* Framed spin video */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-xl rounded-[1.75rem] overflow-hidden
                                   shadow-2xl border border-white/70 bg-white"
                    >
                        <video
                            className="w-full aspect-video object-cover"
                            src="/videos/hero-spin.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            aria-hidden="true"
                        />
                        {/* Faint inner ring so the white video background doesn't hard-edge against the card */}
                        <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-black/5 pointer-events-none" />
                    </motion.div>

                    {/* Caption */}
                    <motion.p
                        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-8 text-maroon text-xl md:text-2xl font-heading max-w-xl"
                    >
                        Every spin of the dress carries an artisan's story.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
                        className="mt-7 flex flex-wrap justify-center gap-4"
                    >
                        <Link
                            to="/catalog"
                            className="px-6 py-3 rounded-full bg-terracotta text-white font-semibold
                                       hover:bg-maroon transition-colors"
                        >
                            Browse the Catalog
                        </Link>
                        <Link
                            to="/for-artisans"
                            className="px-6 py-3 rounded-full border border-maroon text-maroon font-semibold
                                       hover:bg-maroon hover:text-white transition-colors"
                        >
                            For Artisans
                        </Link>
                    </motion.div>

                    {/* Scroll cue */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 8, 0] }}
                        transition={{
                            opacity: { duration: 0.6, delay: 0.9 },
                            y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 },
                        }}
                        className="mt-8 text-maroon/50"
                        aria-hidden="true"
                    >
                        <ChevronDown size={22} />
                    </motion.div>
                </div>
            </section>

            {/* ================= WHAT HURMITCH IS + THE PROBLEM ================= */}
            <Reveal>
                <section className="px-6 py-16 max-w-3xl mx-auto text-center">
                    <h2 className="font-heading text-2xl text-maroon">What Hurmitch Is</h2>
                    <p className="mt-4 text-charcoal/80">
                        Hurmitch is a direct-to-buyer storefront for Karhai — hand embroidery — artisans in Mithi
                        and across Tharparkar, paired with a voice-first onboarding Agent so artisans with no tech
                        literacy can still list their own work, just by sending a photo and speaking a few words.
                    </p>

                    <h2 className="font-heading text-2xl text-maroon mt-12">The Problem</h2>
                    <p className="mt-4 text-charcoal/80">
                        Karhai artisans in Mithi and across Tharparkar produce internationally recognized
                        mirror-work embroidery, but sell almost entirely through local middlemen who take the
                        largest share of the profit. These artisans have no direct way to reach buyers in Karachi,
                        Lahore, or abroad who would pay real prices for authentic handwork.
                    </p>
                </section>
            </Reveal>

            {/* ================= FEATURED WORK ================= */}
            <Reveal delay={0.1}>
                <section className="px-6 py-16 bg-ink/5">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-heading text-2xl text-maroon text-center mb-10">Featured Work</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featured.map((product, i) => (
                                <Reveal key={product.id} delay={i * 0.1}>
                                    <ProductCard product={product} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* ================= HOW IT WORKS ================= */}
            <Reveal>
                <section className="px-6 py-16 max-w-5xl mx-auto">
                    <h2 className="font-heading text-2xl text-maroon text-center mb-10">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-gold text-center mb-4">For Buyers</p>
                            <div className="space-y-4 text-center">
                                <div><div className="text-2xl mb-1">🛍️</div><p className="font-semibold text-maroon">Browse the Catalog</p><p className="text-sm text-charcoal/70">See real work, real artisans, real villages.</p></div>
                                <div><div className="text-2xl mb-1">💬</div><p className="font-semibold text-maroon">Order on WhatsApp</p><p className="text-sm text-charcoal/70">Message the artisan directly — no middleman.</p></div>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-terracotta text-center mb-4">For Artisans</p>
                            <div className="space-y-4 text-center">
                                <div><div className="text-2xl mb-1">📷🎙️</div><p className="font-semibold text-maroon">Send a Photo & Voice Note</p><p className="text-sm text-charcoal/70">Describe the piece, time taken, and price.</p></div>
                                <div><div className="text-2xl mb-1">✅</div><p className="font-semibold text-maroon">Confirm the Listing</p><p className="text-sm text-charcoal/70">A drafted listing is confirmed before it goes live.</p></div>
                            </div>
                        </div>
                    </div>
                </section>
            </Reveal>
        </div>
    )
}