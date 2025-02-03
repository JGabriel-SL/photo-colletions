import React from "react";
import './index.css';

const ImageItem = ({ imageUrl, imageName }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob(); 

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = imageName || "downloaded_image.jpg"; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar a imagem:", error);
    }
  };

  return (
    <img
      src={imageUrl}
      alt="Imagem"
      onClick={handleDownload} 
    />
  );
};

export default ImageItem;
