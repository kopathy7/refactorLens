import api from "./api";

export async function getSource(
  repository: string,
  functionName: string
) {
  const response = await api.get("/source", {
    params: {
      repository,
      function: functionName,
    },
  });

  return response.data;
}