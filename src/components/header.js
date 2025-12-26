import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header className="topbar">
      <div className="brand">Business</div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/pricing">Pricing</Link>
      </nav>
    </header>
  );
}
