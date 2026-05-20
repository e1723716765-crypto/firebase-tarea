import {
  DataSnapshot,
  get,
  off,
  onValue,
  push,
  ref,
  serverTimestamp,
  set,
  update,
  remove,
} from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Species, SpeciesFormValues } from "../types/species";
import { db, storage } from "./firebaseConfig";
const SPECIES_PATH = "species";

const snapshotToArray = (snapshot: DataSnapshot): Species[] => {
  const val = snapshot.val() as Record<string, Omit<Species, "id">> | null;
  if (!val) return [];

  return Object.entries(val).map(([id, data]) => ({
    id,
    commonName: data.commonName ?? "",
    scientificName: data.scientificName ?? "",
    habitat: data.habitat ?? "",
    imageUrl: data.imageUrl ?? "",
    createdAt: data.createdAt,
  }));
};

// Crear registro
export const addSpecies = async (
  values: SpeciesFormValues,
): Promise<string> => {
  const speciesRef = ref(db, SPECIES_PATH);
  const newRef = push(speciesRef);
  await set(newRef, {
    ...values,
    imageUrl: "",
    createdAt: serverTimestamp(),
  });
  return newRef.key as string;
};

//  Subir imagen
export const uploadImage = async (
  speciesId: string,
  uri: string,
): Promise<string> => {
  if (!uri) return "";

  const response = await fetch(uri);
  const blob = await response.blob();

  const imageRef = storageRef(storage, `species/${speciesId}.jpg`);

  await uploadBytes(imageRef, blob);

  const downloadUrl = await getDownloadURL(imageRef);
  return downloadUrl;
};

//  ACTUALIZAR
export const updateSpecies = async (
  id: string,
  datosActualizados: Partial<Species>,
): Promise<boolean> => {
  try {
    const speciesRef = ref(db, `${SPECIES_PATH}/${id}`);
    await update(speciesRef, datosActualizados);
    return true;
  } catch (error) {
    console.error("Error al actualizar:", error);
    return false;
  }
};

//READ (TAL CUAL LO TENÍAS)

export const subscribeToSpecies = (
  onData: (species: Species[]) => void,
  onError: (error: Error) => void,
): (() => void) => {
  const speciesRef = ref(db, SPECIES_PATH);
  onValue(
    speciesRef,
    (snapshot) => {
      const data = snapshotToArray(snapshot);
      data.sort((a, b) => (b.createdAt as number) - (a.createdAt as number));
      onData(data);
    },
    (error) => onError(error),
  );
  return () => off(speciesRef, "value");
};

export const getSpeciesById = async (id: string): Promise<Species | null> => {
  const speciesRef = ref(db, `${SPECIES_PATH}/${id}`);
  const snapshot = await get(speciesRef);

  if (!snapshot.exists()) return null;

  return {
    id,
    ...(snapshot.val() as Omit<Species, "id">),
  };
};

//UPDATE

export const updateSpeciesWithImage = async (
  id: string,
  datos: Omit<SpeciesFormValues, "imageUrl">,
  nuevaImagenUri?: string,
  imagenActualUrl?: string,
): Promise<boolean> => {
  try {
    let imageUrlFinal = imagenActualUrl || "";

    if (nuevaImagenUri) {
      if (imagenActualUrl) {
        try {
          const oldImageRef = storageRef(storage, imagenActualUrl);
          await deleteObject(oldImageRef);
        } catch (e) {
          console.log("No había imagen anterior o ya fue borrada");
        }
      }

      imageUrlFinal = await uploadImage(id, nuevaImagenUri);
    }

    return await updateSpecies(id, {
      ...datos,
      imageUrl: imageUrlFinal,
    });
  } catch (error) {
    console.error("Error en update completo:", error);
    return false;
  }
};

// DELETE
export const deleteSpecies = async (
  id: string,
  imageUrl?: string,
): Promise<boolean> => {
  try {
    if (imageUrl) {
      const imageRef = storageRef(storage, imageUrl);
      await deleteObject(imageRef);
    }

    const speciesRef = ref(db, `${SPECIES_PATH}/${id}`);
    await remove(speciesRef);

    return true;
  } catch (error) {
    console.error("Error al eliminar:", error);
    return false;
  }
};
