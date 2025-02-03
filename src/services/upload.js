import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';

async function uploadImage(image) {
  if (!image) {
    throw new Error("Nenhuma imagem selecionada.");
  }

  try {
    console.log(`Starting function ${image.name}`)

    // Criando referência para o Firebase Storage
    const imageRef = ref(storage, `images/${image.name}`);
    console.log(`criou o imageRef ${imageRef}`)

    // Fazendo o upload da imagem
    await uploadBytes(imageRef, image);

    console.log(`Uploading ${image.name}`)

    // Obtendo a URL pública da imagem após o upload
    const imageUrl = await getDownloadURL(imageRef);

    // Salvando a URL da imagem no Firestore com timestamp
    await addDoc(collection(db, 'images'), {
      imageUrl: imageUrl,
      timestamp: serverTimestamp(),
    });

    console.log('Imagem enviada com sucesso:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Erro ao enviar a imagem:', error);
    throw error;
  }
}

export default uploadImage;
