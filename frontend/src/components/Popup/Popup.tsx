// src/components/Popup/Popup.tsx
import { useState } from 'react';
import { FaTimes, FaUser } from 'react-icons/fa';
import styles from './styles.module.css';
import React from 'react';

import { useEffect } from 'react';


interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup = ({ isOpen, onClose }: PopupProps) => {
  // Bloqueia scroll quando popup está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      
      <div className={styles.popupContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className={styles.popupContent}>
          <h2>Add New Movie</h2>
          
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Title</label>
              <input type="text" placeholder="Movie title" />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Description</label>
              <textarea placeholder="Movie description"></textarea>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Thumbnail URL</label>
              <input type="text" placeholder="Thumbnail image URL" />
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Add Movie
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Popup;