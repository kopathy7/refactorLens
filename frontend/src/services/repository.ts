import api from "./api";

export async function cloneRepository(repositoryUrl: string) {
    const response = await api.post("/repository/clone", {
        repository_url: repositoryUrl,
    });

    return response.data;
}