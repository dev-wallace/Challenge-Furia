// src/App.tsx
import { useState } from 'react';
import Carousel from './components/Carousel/Carousel';
import './styles/global.css';
import ChatBubble from './components/ChatBubble/ChatBubble'; 

import jv92Grande from './assets/jv92_in_Furia_grande.jpg';
import herdzGrande from './assets/Herdsz-grande.jpg'
import igorctgGrande from './assets/igoorctg_in_Furia_grande.jpg'
import kheyzeGrande from './assets/Kheyze_in_Furia_grande.jpg'
import nadeGrande from './assets/Nade_in_Furia_garnde.jpg'
import felipoxGrande from './assets/FelipoX_in_Furia_grande.jpg'

const App = () => {
  const [jogadores, setJogadores] = useState([
    {
      id: 1,
      title: 'Chama Responsa',
      logo: 'HerdsZ',
      description: 'Herdz enxerga o jogo como ninguém. Com uma mente afiada, ele lê o mapa como um quebra-cabeça e encontra o gap perfeito para vencer. É o cérebro da FURIA e o terror dos estrategistas rivais.',
      thumbnail: herdzGrande,
      backgroundImage: herdzGrande,
      watchLink: 'https://youtu.be/NuvMwCLeOlc?si=MBAhvK3FKM9VJGdu'
    },
    {
      id: 2,
      title: 'O rei do trash talk',
      logo: ' Jv92',
      description: 'O rei do trash talk, jv92 joga com a mente dos adversários antes mesmo do primeiro tiro.jv92 guia a equipe com gritos, calls e uma mira que impõe respeito.',
      thumbnail: jv92Grande,
      backgroundImage: jv92Grande,
      watchLink: 'https://youtu.be/eCKlJDPTxu0?si=jG2ESMXnGqkTviN5'
    },
    {
      id: 3,
      title: 'O Analista',
      logo: ' Igoorctg',
      description: 'Mesmo no 6x3, quando todo mundo já largou, Igorctg tá lá — confiante, vibrando e acreditando. Ele é o escudo mental da FURIA, o cara que segura o emocional e puxa a responsa mesmo sem ter mouse na mão.',
      thumbnail: igorctgGrande,
      backgroundImage: igorctgGrande,
      
    },
    {
      id: 4,
      title: 'Mirinha Dura',
      logo: ' Kheyze	',
      description: 'Confiança no talo e dedo pesado, Kheyze não pensa duas vezes. Pode ter 1 de vida ou 5 inimigos na frente — ele bota a mira e amassa.',
      thumbnail: kheyzeGrande,
      backgroundImage: kheyzeGrande,
      watchLink: 'https://youtu.be/CAOoE7g3MGU?si=lZEtfYOojQtB34bB'
    },
    {
      id: 5,
      title: 'Impipocavel',
      logo: 'Nade ',
      description: 'Com uma leitura de jogo afiada e um domínio absurdo de utilitários, nade transforma informação em eliminação.',
      thumbnail: nadeGrande,
      backgroundImage: nadeGrande,
      watchLink: 'https://youtu.be/plNA1lchV3g?si=4tCaBwG_90r4BvUS'
    },
    {
      id: 6,
      title: 'The Clutch King',
      logo: ' FelipoX	',
      description: 'Quando a rodada está por um fio, é Felipox quem resolve. Frieza e clutch são sinônimos do seu jogo.',
      thumbnail: felipoxGrande,
      backgroundImage: felipoxGrande,
      watchLink: 'https://youtu.be/b2spR-TmjWI?si=ipHN_SZdDl7O_xxb'
    },
    
  ]);


  return (
    <div className="App">
      <Carousel jogadores={jogadores} />
      <ChatBubble /> 
    </div>
  );
};

export default App;