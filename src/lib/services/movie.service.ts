import { MovieRepository } from "@/lib/repositories/movie.repository";

export const MovieService = {
  async listMovies() {
    // Could add filters, caching, recommendations later
    return MovieRepository.getAll();
  },

  async getMovie(id: string) {
    return MovieRepository.getById(id);
  },

  async addMovie(title: string, description: string, genre: string) {
    return MovieRepository.create({ title, description, genre });
  },
};
