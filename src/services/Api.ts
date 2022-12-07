import { http } from "../config/http";

class Api {
  constructor(private httpService: typeof http) {}
  async get<T>(endpoint: string) {
    const response = await this.httpService.get<T[]>(endpoint);
    return response.data;
  }
}

const api = new Api(http);
export default api;
