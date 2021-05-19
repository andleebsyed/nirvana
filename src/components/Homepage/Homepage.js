import "./Homepage.css";
import { Link } from "react-router-dom";
export function Homepage() {
  return (
    <div className="homepage">
      <p>Life is a trip and travelling is living twice...</p>
      <p>So why not dare to live twice and get out there to feed your soul</p>
      <p>Warning : Content may cause wanderlust</p>
      <div className="homepage-buttons-outer">
        <Link to="/explore">
          <button className="homepage-single-button">Explore</button>
        </Link>
        <Link to="#">
          <button className="homepage-single-button">Login</button>
        </Link>
      </div>
    </div>
  );
}
