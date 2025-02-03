import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

async function uploadImage(imageUrl, nameImage) {
  try {
    const docRef = await addDoc(collection(db, 'images'), {
      imageUrl: imageUrl,
      nameImage: nameImage,
      timestamp: serverTimestamp(),
    });

    console.log('Imagem salva no Firestore com sucesso! ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao enviar a imagem para Firestore:', error);
    throw error;
  }
}

export default uploadImage;
