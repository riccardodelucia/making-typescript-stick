export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `${"get"}${Capitalize<string & K>}`]: (
    id: string
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `${"add"}${Capitalize<string & K>}`]: (
    arg: DataEntityMap[K]
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `${"getAll"}${Capitalize<
    string & K
  >}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `${"clear"}${Capitalize<
    string & K
  >}s`]: () => void;
};

export class DataStore implements DataStoreMethods {
  #data: { [Key in keyof DataEntityMap as `${Key}s`]: DataEntityMap[Key][] } = {
    movies: [],
    songs: [],
  };
  addMovie(m: Movie) {
    this.#data.movies.push(m);
    return m;
  }
  addSong(s: Song) {
    this.#data.songs.push(s);
    return s;
  }
  getMovie(id: string) {
    const movie = this.#data.movies.find((item) => item.id === id);
    if (!movie) throw new Error(`Could not find movie with id: ${id}`);
    return movie;
  }
  getSong(id: string) {
    const song = this.#data.songs.find((item) => item.id === id);
    if (!song) throw new Error(`Could not find song with id: ${id}`);
    return song;
  }
  getAllMovies() {
    return this.#data.movies;
  }
  getAllSongs() {
    return this.#data.songs;
  }
  clearMovies() {
    this.#data.movies = [];
  }
  clearSongs() {
    this.#data.songs = [];
  }
}
