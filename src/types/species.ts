export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  habitat: string;
  imageUrl: string;
  createdAt: number;        
}

export type SpeciesFormValues = Omit<Species, 'id' | 'createdAt' | 'imageUrl'> & {
  imageUrl?: string;
};