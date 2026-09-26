export default function ForArtisans() {
    const contactMessage = encodeURIComponent("Hi! I'm an artisan interested in listing my work on Hurmitch.")
    const contactLink = `https://wa.me/923000000000?text=${contactMessage}`

    return (
        <div>
            <section className="px-6 py-20 text-center bg-sand">
                <h1 className="font-heading text-4xl text-maroon font-bold">For Artisans</h1>
                <p className="mt-4 text-lg text-charcoal/80 max-w-2xl mx-auto">
                    You don't need a website, an account, or any technical skill.
                    Just send a photo and a voice note over WhatsApp — we'll help you get listed.
                </p>
            </section>

            <section className="px-6 py-16 max-w-4xl mx-auto">
                <div className="space-y-10">
                    <div className="flex gap-6 items-start">
                        <div className="text-3xl font-heading text-gold">01</div>
                        <div>
                            <p className="font-semibold text-maroon text-lg">Send a Photo</p>
                            <p className="text-charcoal/70 mt-1">Take a picture of your finished piece on your phone and send it to our WhatsApp number below. No special lighting or camera needed — a clear phone photo is enough.</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="text-3xl font-heading text-gold">02</div>
                        <div>
                            <p className="font-semibold text-maroon text-lg">Record a Voice Note</p>
                            <p className="text-charcoal/70 mt-1">In your own words — Urdu or Sindhi — tell us what the piece is, roughly how long it took to make, and the price you'd like to sell it for. No forms to fill, no typing required.</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="text-3xl font-heading text-gold">03</div>
                        <div>
                            <p className="font-semibold text-maroon text-lg">We Draft the Listing</p>
                            <p className="text-charcoal/70 mt-1">Your photo and description are turned into a listing for the catalog — your name, your village, and your price, exactly as you described it.</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="text-3xl font-heading text-gold">04</div>
                        <div>
                            <p className="font-semibold text-maroon text-lg">You Confirm Before It Goes Live</p>
                            <p className="text-charcoal/70 mt-1">Nothing is published without you seeing and approving it first — so if anything was misheard or needs a change, it gets fixed before any buyer sees it.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-12 max-w-2xl mx-auto">
                <div className="p-5 bg-gold/10 border border-gold rounded-lg text-center">
                    <p className="text-sm text-charcoal/80">Hurmitch is currently a working prototype built for Imaginathon. The listing process above is the vision we're building toward — today, reach out directly on WhatsApp and we'll help you get your first piece listed by hand.</p>
                </div>
            </section>

            <section className="px-6 py-16 text-center bg-ink/5">
                <h2 className="font-heading text-2xl text-maroon mb-6">Ready to List Your Work?</h2>
                <a href={contactLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-terracotta text-white px-8 py-4 rounded-lg font-semibold hover:bg-maroon transition-colors">
                    Message Us on WhatsApp
                </a>
            </section>
        </div>
    )
}