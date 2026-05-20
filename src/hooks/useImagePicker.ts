// Hook para seleccionar o capturar una imagen y subirla a Firebase Storage.

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadSpeciesImage } from "../services/storageServices";

interface UseImagePickerReturn {
  selectedImageUri: string | null; // URI local para preview inmediato
  uploading: boolean;
  pickImage: () => Promise<void>;
  pickFromGallery: () => Promise<void>;
  pickFromCamera: () => Promise<void>;
  uploadImage: (speciesId: string) => Promise<string | null>; // retorna downloadURL
  resetImage: () => void;
  reset: () => void;
}

export const useImagePicker = (): UseImagePickerReturn => {
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  
  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesita permiso para acceder a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setLocalUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    await pickFromGallery();
  };

  
  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesita permiso para usar la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setLocalUri(result.assets[0].uri);
    }
  };

  
  const uploadImage = async (speciesId: string): Promise<string | null> => {
    if (!localUri) return null;

    setUploading(true);
    try {
      const downloadUrl = await uploadSpeciesImage(localUri, speciesId);
      return downloadUrl;
    } catch (error) {
      console.error("Error al subir imagen:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const reset = () => setLocalUri(null);
  const resetImage = () => reset();

  return {
    selectedImageUri: localUri,
    uploading,
    pickImage,
    pickFromGallery,
    pickFromCamera,
    uploadImage,
    resetImage,
    reset,
  };
};

