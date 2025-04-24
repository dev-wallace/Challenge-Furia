// src/components/Navbar/Navbar.tsx
import { useState } from 'react';
import styles from './styles.module.css';
import { FaBars } from 'react-icons/fa';
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
          <li><a href="#" className={styles.dropdown_links}>Add Movie</a></li>
          <li><a href="#">Movie List</a></li>
          <li><a href="#">Trailer Movie</a></li>
        </ul>
        <div className={styles.toggle_btn} onClick={toggleDropdown}>
          <FaBars />
        </div>

        <div className={`${styles.dropdown} ${dropdownOpen ? styles.open : ''}`}>
          <li><a className={styles.dropdown_links} href="#">Add Movie</a></li>
          <li><a className={styles.dropdown_links} href="#">Movie List</a></li>
          <li><a className={styles.dropdown_links} href="#">Trailer Movie</a></li>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;