import React, { useState, useEffect } from'react';
import { db } from './firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

import ImageItem from './components/ImageItem';
import UploadInput from './components/Upload';
import './App.css';

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

  const [images, setImages] = useState([]);
  
  const t = translations[language];

  useEffect(() => {
    async function fetchImages() {
      const querySnapshot = await getDocs(collection(db, 'images'));
      const imageData = querySnapshot.docs.map(doc => doc.data());
      setImages(imageData);      
    }

    fetchImages();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">{t.title}</h1>
        <p className='subtitle'>{t.subtitle}</p>

        <UploadInput setImages={setImages}/>
      </div>
      
      <div className='photos'>
          {images.map((img, index) => (
            <div className="photo" key={index}>
              <ImageItem imageUrl={img.imageUrl} imageName={img.nameImage} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
