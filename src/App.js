import './App.css';
import React, { useState } from'react';

import uploadImage from '../src/services/upload';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const translations = {
  pt: {
    title: 'Adrian e Jordania',
    subtitle: 'Para que este momento seja inesquecível, tire uma foto e anexe aqui.'
  },
  es: {
    title: 'Adrian y Jordania',
    subtitle: 'Para que este momento sea inolvidable, tome una foto y añádela aquí.'
  }
}

function App() {
  const [language, setLanguage] = useState('pt');
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  
  const t = translations[language];

  const handleUpload = async () => {
    if (!image) return;
   
    uploadImage(image);

    alert('Imagem carregada com sucesso!');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">{t.title}</h1>
        <p className='subtitle'>{t.subtitle}</p>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleUpload}>
          <span>Anexar Imagem</span>
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </div>
      
      <div className="photos">
        <div className="photo">
          <img src="w1.jpeg" alt="w1" className="photo-img"/>
        </div>
        <div className="photo">
          <img src="w2.jpg" alt="w1" className="photo-img"/>
        </div>
      </div>
    </div>
  );
}

export default App;
