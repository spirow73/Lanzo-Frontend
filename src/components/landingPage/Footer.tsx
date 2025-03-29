import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-8 relative z-10">
      <p className="text-sm text-white">© 2025 Lanzo. Todos los derechos reservados.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm text-white hover:text-gray-300" to="#">
          Términos de servicio
        </Link>
        <Link className="text-sm text-white hover:text-gray-300" to="#">
          Privacidad
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
