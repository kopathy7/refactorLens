import api from "./api";

export async function getGraph(repository: string) {
  const response = await api.get("/graph", {
    params: {
      repository,
    },
  });

  return response.data;
}