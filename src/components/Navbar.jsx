import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="relative px-6 py-4 bg-sand">
            <div className="flex items-center justify-between">
                <Link to="/" className="font-heading text-xl font-bold text-maroon" onClick={() => setOpen(false)}>
                    Hurmitch
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex gap-6 font-body">
                    <Link to="/" className="text-charcoal hover:text-terracotta">Home</Link>
                    <Link to="/catalog" className="text-charcoal hover:text-terracotta">Catalog</Link>
                    <Link to="/for-artisans" className="text-charcoal hover:text-terracotta">For Artisans</Link>
                </div>

                {/* Mobile menu button */}
                <button onClick={() => setOpen(!open)} className="md:hidden text-maroon">
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <div className="md:hidden mt-4 flex flex-col gap-4 font-body pb-2">
                    <Link to="/" className="text-charcoal hover:text-terracotta" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/catalog" className="text-charcoal hover:text-terracotta" onClick={() => setOpen(false)}>Catalog</Link>
                    <Link to="/for-artisans" className="text-charcoal hover:text-terracotta" onClick={() => setOpen(false)}>For Artisans</Link>
                </div>
            )}
        </nav>
    )
}