import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LanzoLogo from "@/assets/logos/LanzoLogo.png";
import { menuItems, navVariants } from "../../data/navItems";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/projects");
  };

  return (
    <header className="fixed top-0 left-0 right-0 px-6 py-4 shadow flex items-center z-50 backdrop-blur-md bg-[rgba(0,0,0,0.4)]">
      <Link className="flex items-center space-x-2" to="#">
        <img src={LanzoLogo} alt="Lanzo Logo" className="h-9 w-9 mr-2 rounded-full p-1 shadow" />
        <span className="text-2xl font-extrabold text-white tracking-tight">Lanzo</span>
      </Link>
      <nav className="ml-auto flex items-center space-x-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            variants={navVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <a
              className="text-lg text-white hover:text-gray-300 transition-colors"
              href={item.to}
            >
              {item.label}
            </a>
          </motion.div>
        ))}
        <Button
          variant="outline"
          onClick={handleStart}
          className="ml-4 border-white text-white hover:bg-white hover:text-[#2D033B] text-lg px-4 py-2"
        >
          Empezar ya
        </Button>
      </nav>
    </header>
  );
};

export default Header;
