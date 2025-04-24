import React from 'react';
import { Jogadores } from '../../types/types';
import styles from './styles.module.css';

interface ThumbnailProps {
  jogadores: Jogadores[];
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
}

const Thumbnail = ({ jogadores, currentIndex, onThumbnailClick }: ThumbnailProps) => {
  return (
    <div className={styles.thumbnail}>
      {jogadores.map((jogador, index) => ( 
        <div 
          key={jogador.id}
          className={`${styles.item} ${index === currentIndex ? styles.active : ''}`}
          onClick={() => onThumbnailClick(index)}
        >
          <img 
            src={jogador.thumbnail} 
            alt={`Thumbnail ${jogador.title}`}
            className={styles.thumbnailImage}
          />
        </div>
      ))}
    </div>
  );
};

export default Thumbnail;