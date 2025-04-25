import React from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './styles.module.css';
import { Jogadores } from '../../types/types';

interface CarouselItemProps {
  jogadores: Jogadores;
  active: boolean;
  onWatchNow: () => void;
}

const CarouselItem = ({ jogadores, active, onWatchNow }: CarouselItemProps) => {
  if (!active) return null;

  return (
    <div className={styles.item}>
      <img src={jogadores.backgroundImage} alt={jogadores.title} />
      <Navbar logo={jogadores.logo} /> {}
      
      <div className={styles.content}>
        <div className={styles.main_text}>
          <h2 className={styles.title}>{jogadores.title}</h2>
          <p className={styles.paragrafo}>{jogadores.description}</p>
          <button 
            onClick={onWatchNow}
            className={styles.watch_now}
          >
            Highlights
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;