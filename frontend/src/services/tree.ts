import api from "./api";

export async function getRepositoryTree(repository: string) {
  const response = await api.get("/repository/tree", {
    params: {
      repository,
    },
  });

  return response.data;
}