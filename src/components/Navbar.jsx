import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-sand">
            <Link to="/" className="font-heading text-xl font-bold text-maroon">Hurmitch</Link>
            <div className="flex gap-6 font-body">
                <Link to="/" className="text-charcoal hover:text-terracotta">Home</Link>
                <Link to="/catalog" className="text-charcoal hover:text-terracotta">Catalog</Link>
                <Link to="/for-artisans" className="text-charcoal hover:text-terracotta">For Artisans</Link>
            </div>
        </nav>
    )
}