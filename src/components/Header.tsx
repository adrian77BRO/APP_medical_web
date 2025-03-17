import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark header">
            <div className="container">
                <Link className="navbar-brand" to="/">Healthy Life</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/home">Servicios médicos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/appointments">Citas pendientes</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};