import { useState } from "react";
import uploadImage from "../../services/upload";
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.css';

const UploadInput = ({setImages}) => {
  const [image, setImage] = useState(null);

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0]; 

    if (selectedImage) {
      setImage(selectedImage); 
      handleUpload(selectedImage); 
    }
  };

  const handleUpload = async (image) => {
    if (!image) return alert("Escolha uma imagem!");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload?key=c6b621bd3c301846c5cc659fc61a3c22", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        await uploadImage(data.data.url, data.data.title);

        const newImage = {
          imageUrl: data.data.url,
          nameImage: data.data.title,
          uploadedAt: new Date(),
        }
        
        setImages(prevImages => [ newImage, ...prevImages]);

        alert("Upload feito com sucesso!");
      } else {
        alert("Erro ao fazer upload");
      }
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    }
  };

  return (
    <div>
      <label className="custom-file-upload">
        <input type="file" onChange={handleImageChange} />
        <span>
          <span>Anexar Imagem</span>
          <FontAwesomeIcon icon={faUpload} />
        </span>
      </label>
    </div>
  );
};

export default UploadInput;
