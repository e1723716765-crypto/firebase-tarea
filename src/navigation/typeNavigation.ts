import { StackScreenProps } from "@react-navigation/stack";

// Tipado de navegación
import { Species } from "../types/species";

export type RootStackParamList = {
  Home: undefined;
  Detail: { speciesId: string };
  Form: { species?: Species };
};


export type ScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;