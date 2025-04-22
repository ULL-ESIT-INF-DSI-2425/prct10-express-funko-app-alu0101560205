/**
 * Enum para representar los tipos del funko
 */
export enum FunkoType {
  Pop = 'Pop!',
  PopRides = 'Pop! Rides',
  VynilSoda = 'Vynil Soda',
  VynilGold = 'Vynil Gold'
}

/**
 * enum para representar el genero de un Funko
 */
export enum FunkoGenre {
  Animation = 'Animación',
  MoviesTV = 'Películas y TV',
  Videogames = 'Videojuegos',
  Sports = 'Deportes',
  Music = 'Música',
  Anime = 'Ánime'
}

/**
 * Interfaz para representar un Funko con sus respectivos atributos
 */
export interface Funko {
  id: number;
  name: string;
  description: string;
  type: FunkoType;
  genre: FunkoGenre;
  franchise: string;
  number: number;
  exclusive: boolean;
  specialFeatures: string;
  marketValue: number;
}