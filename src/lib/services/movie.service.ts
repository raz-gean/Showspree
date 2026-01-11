import { MovieRepository } from "@/lib/repositories/movie.repository";

export const MovieService = {
  async listMovies() {
    // Could add filters, caching, recommendations later
    return MovieRepository.getAll();
  },

  async getMovie(id: string) {
    return MovieRepository.getById(id);
  },

  async addMovieFromTmdb(params: {
    tmdbId?: string | null;
    title: string;
    description: string;
    genre: string;
    posterUrl?: string | null;
    trailerUrl?: string | null;
  }) {
    return MovieRepository.create(params);
  },
};
