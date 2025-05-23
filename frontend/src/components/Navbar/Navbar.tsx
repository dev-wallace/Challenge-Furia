// src/components/Navbar/Navbar.tsx
import { useState } from 'react';
import styles from './styles.module.css';

import React from 'react';

const Navbar = ({ logo }: { logo: string }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.nav_logo}>{logo}</div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="#" className={styles.dropdown_links}>Fale com a Pantera</a></li>
          <li><a href="#">Descubra que tipo de torcedor você é</a></li>
          <li><a href="#">Sobre</a></li>
        </ul>
      

      
      </nav>
    </header>
  );
};

export default Navbar;