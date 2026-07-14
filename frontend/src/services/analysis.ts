import api from "./api";

export async function getImpactAnalysis(
    repository: string,
    functionName: string
) {
    const response = await api.get("/analysis/impact", {
        params: {
            repository,
            function: functionName,
        },
    });

    return response.data;
}