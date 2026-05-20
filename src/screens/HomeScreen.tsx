import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert, 
} from "react-native";

import { ScreenProps } from "../navigation/typeNavigation";
import { Species } from "../types/species";
import { homeStyles } from "../theme/appStyles";
import { useSpecies } from "../hooks/useSpecies";
import { deleteSpecies } from "../services/speciesServices"; 

type Props = ScreenProps<"Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const { species, loading, error } = useSpecies();

  
  const handleDelete = (id: string, imageUrl: string = "") => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro? Esta acción no se puede deshacer y borrará también la imagen.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const eliminado = await deleteSpecies(id, imageUrl);
            if (eliminado) {
              console.log("✅ Registro eliminado correctamente");
              
            } else {
              Alert.alert("Error", "No se pudo eliminar el registro");
            }
          },
        },
      ]
    );
  };

  
  const renderItem = ({ item }: { item: Species }) => (
    <TouchableOpacity
      style={homeStyles.card}
      onPress={() => navigation.navigate("Detail", { speciesId: item.id })} 
      activeOpacity={0.85}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={homeStyles.thumbnail} />
      ) : (
        <View style={[homeStyles.thumbnail, homeStyles.placeholder]}>
          <Text style={homeStyles.placeholderText}>🌿</Text>
        </View>
      )}

      <View style={homeStyles.cardInfo}>
        <Text style={homeStyles.commonName}>{item.commonName}</Text>
        <Text style={homeStyles.scientificName}>{item.scientificName}</Text>
        <Text style={homeStyles.habitat}>{item.habitat}</Text>
      </View>

      <View style={homeStyles.cardActions}>
        {}
        <TouchableOpacity
          onPress={() => navigation.navigate("Form", { species: item })}
          style={homeStyles.editBtn}
        >
          <Text style={homeStyles.editBtnText}>✏️</Text>
        </TouchableOpacity>

        {}
        <TouchableOpacity onPress={() => handleDelete(item.id, item.imageUrl)}>
          <Text style={homeStyles.deleteBtnText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  //carga
  if (loading) {
    return (
      <View style={homeStyles.center}>
        <ActivityIndicator size="large" color="#1a5c38" />
        <Text style={homeStyles.loadingText}>Cargando especies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={homeStyles.center}>
        <Text style={homeStyles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <FlatList
        data={species}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={homeStyles.list}
        ListEmptyComponent={
          <View style={homeStyles.center}>
            <Text style={homeStyles.emptyText}>
              No hay especies registradas.
            </Text>
          </View>
        }
      />

      {/* AGREGAR*/}
      <TouchableOpacity
        style={homeStyles.fab}
        onPress={() => navigation.navigate("Form", {})}
      >
        <Text style={homeStyles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};