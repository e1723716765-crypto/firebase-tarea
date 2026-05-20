import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

import { ScreenProps } from "../navigation/typeNavigation";
import { Species, SpeciesFormValues } from "../types/species";
import { formStyles } from "../theme/appStyles";
import { useImagePicker } from "../hooks/useImagePicker"; // ✅ Tu hook para imágenes
import {
  addSpecies,
  uploadImage,
  updateSpecies,
  updateSpeciesWithImage,
} from "../services/speciesServices";

type Props = ScreenProps<"Form">;

export const FormScreen = ({ navigation, route }: Props) => {
  
  const speciesToEdit = route.params?.species as Species | undefined;
  const isEditing = !!speciesToEdit;

  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [habitat, setHabitat] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState(""); // Imagen actual (edición)
  const [loading, setLoading] = useState(false);

  
  const { selectedImageUri, pickImage, resetImage } = useImagePicker();

 //cargar
  useEffect(() => {
    if (isEditing && speciesToEdit) {
      setCommonName(speciesToEdit.commonName);
      setScientificName(speciesToEdit.scientificName);
      setHabitat(speciesToEdit.habitat);
      setCurrentImageUrl(speciesToEdit.imageUrl);
    }
  }, [isEditing, speciesToEdit]);

  // guardar
  const handleSubmit = async () => {
    
    if (!commonName || !scientificName || !habitat) {
      Alert.alert("Campos obligatorios", "Completa todos los campos");
      return;
    }

    const formData: SpeciesFormValues = {
      commonName,
      scientificName,
      habitat,
    };

    try {
      setLoading(true);

      if (isEditing) {
        // actualizar
        const ok = await updateSpeciesWithImage(
          speciesToEdit.id,
          formData,
          selectedImageUri ?? undefined, 
          currentImageUrl 
        );

        if (ok) {
          Alert.alert("Éxito", "Registro actualizado correctamente");
          navigation.goBack();
        } else {
          Alert.alert("Error", "No se pudo actualizar el registro");
        }
      } else {
        // cear nuevo
        const newId = await addSpecies(formData);

        if (selectedImageUri) {
          const imageUrl = await uploadImage(newId, selectedImageUri);

          // guardar en database
          if (imageUrl) {
            await updateSpecies(newId, { imageUrl });
          }
        }

        Alert.alert("Éxito", "Especie registrada correctamente");
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={formStyles.container} contentContainerStyle={formStyles.content}>
      <Text style={formStyles.title}>
        {isEditing ? "✏️ Editar Especie" : "🌿 Nueva Especie"}
      </Text>

      {}
      <View style={formStyles.inputGroup}>
        <Text style={formStyles.label}>Nombre común</Text>
        <TextInput
          style={formStyles.input}
          value={commonName}
          onChangeText={setCommonName}
          placeholder="Ej: Rosa"
        />
      </View>

      <View style={formStyles.inputGroup}>
        <Text style={formStyles.label}>Nombre científico</Text>
        <TextInput
          style={formStyles.input}
          value={scientificName}
          onChangeText={setScientificName}
          placeholder="Ej: Rosa indica"
        />
      </View>

      <View style={formStyles.inputGroup}>
        <Text style={formStyles.label}>Hábitat</Text>
        <TextInput
          style={[formStyles.input, formStyles.textArea]}
          value={habitat}
          onChangeText={setHabitat}
          placeholder="Lugar donde crece o vive"
          multiline
          numberOfLines={4}
        />
      </View>

      {}
      <View style={formStyles.inputGroup}>
        <Text style={formStyles.label}>Imagen</Text>

        {}
        {selectedImageUri || currentImageUrl ? (
          <Image
            source={{ uri: selectedImageUri || currentImageUrl }}
            style={formStyles.previewImage}
            resizeMode="cover"
          />
        ) : (
          <View style={formStyles.placeholderBox}>
            <Text style={formStyles.placeholderText}>Sin imagen</Text>
          </View>
        )}

        <TouchableOpacity style={formStyles.imageBtn} onPress={pickImage}>
          <Text style={formStyles.imageBtnText}>
            {selectedImageUri || currentImageUrl ? "Cambiar imagen 📸" : "Seleccionar imagen 📸"}
          </Text>
        </TouchableOpacity>

        {}
        {selectedImageUri && (
          <TouchableOpacity style={formStyles.resetBtn} onPress={resetImage}>
            <Text style={formStyles.resetBtnText}>Quitar imagen</Text>
          </TouchableOpacity>
        )}
      </View>

      {}
      {loading ? (
        <ActivityIndicator size="large" color="#1a5c38" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity style={formStyles.submitBtn} onPress={handleSubmit}>
          <Text style={formStyles.submitBtnText}>
            {isEditing ? "Guardar cambios" : "Registrar especie"}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};