// src/App.tsx
import { useState } from 'react';
import Carousel from './components/Carousel/Carousel';
import './styles/global.css';

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
      title: 'My Neighbor Totoro',
      japaneseTitle: 'ともだちトトロ',
      description: 'In 1950s rural Japan, sisters Satsuki and Mei Kusakabe move to the countryside with their father to be closer to their hospitalized mother...',
      thumbnail: herdzGrande,
      backgroundImage: herdzGrande,
      watchLink: 'https://www.netflix.com/title/60032294'
    },
    {
      id: 2,
      title: 'A Silent Voice',
      japaneseTitle: '聲の形',
      description: 'Shoya Ishida, a young man haunted by the regret of his past, seeks redemption upon reuniting with Shoko Nishimiya...',
      thumbnail: jv92Grande,
      backgroundImage: jv92Grande,
      watchLink: 'https://www.crunchyroll.com/pt-br/series/GP5HJ84XV/a-silent-voice'
    },
    {
      id: 3,
      title: 'A Silent Voice',
      japaneseTitle: '聲の形',
      description: 'Shoya Ishida, a young man haunted by the regret of his past, seeks redemption upon reuniting with Shoko Nishimiya...',
      thumbnail: igorctgGrande,
      backgroundImage: igorctgGrande,
      watchLink: 'https://www.crunchyroll.com/pt-br/series/GP5HJ84XV/a-silent-voice'
    },
    {
      id: 4,
      title: 'A Silent Voice',
      japaneseTitle: '聲の形',
      description: 'Shoya Ishida, a young man haunted by the regret of his past, seeks redemption upon reuniting with Shoko Nishimiya...',
      thumbnail: kheyzeGrande,
      backgroundImage: kheyzeGrande,
      watchLink: 'https://www.crunchyroll.com/pt-br/series/GP5HJ84XV/a-silent-voice'
    },
    {
      id: 5,
      title: 'A Silent Voice',
      japaneseTitle: '聲の形',
      description: 'Shoya Ishida, a young man haunted by the regret of his past, seeks redemption upon reuniting with Shoko Nishimiya...',
      thumbnail: nadeGrande,
      backgroundImage: nadeGrande,
      watchLink: 'https://www.crunchyroll.com/pt-br/series/GP5HJ84XV/a-silent-voice'
    },
    {
      id: 6,
      title: 'A Silent Voice',
      japaneseTitle: '聲の形',
      description: 'Shoya Ishida, a young man haunted by the regret of his past, seeks redemption upon reuniting with Shoko Nishimiya...',
      thumbnail: felipoxGrande,
      backgroundImage: felipoxGrande,
      watchLink: 'https://www.crunchyroll.com/pt-br/series/GP5HJ84XV/a-silent-voice'
    },
    
  ]);


  return (
    <div className="App">
      <Carousel jogadores={jogadores} />
    </div>
  );
};

export default App;