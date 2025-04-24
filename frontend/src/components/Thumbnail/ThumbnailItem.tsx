import React from 'react';
import { Jogadores } from '../../types/types';
import styles from './styles.module.css';

interface ThumbnailItemProps {
  jogador: Jogadores; // Alterado de movie para jogador
  active: boolean;
  onClick: () => void;
}

const ThumbnailItem = ({ jogador, active, onClick }: ThumbnailItemProps) => {
  return (
    <div 
      className={`${styles.item} ${active ? styles.active : ''}`} 
      onClick={onClick}
    >
      <img src={jogador.thumbnail} alt={jogador.title} />
      <div className={styles.content}>
        <div className={styles.title}>{jogador.title}</div>
      </div>
    </div>
  );
};

export default ThumbnailItem;