import api from "./api";

export async function getStats(repository: string) {
  const response = await api.get("/graph/stats", {
    params: {
      repository,
    },
  });

  return response.data;
}