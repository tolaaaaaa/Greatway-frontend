import { ServerApiClient } from "@/utils/api-server";
import { emptyMetaData } from "@/utils/empty-metadata";

export async function getAnalytics() {
    const response = await ServerApiClient.get<Analytics>(`/analytics`)

    if (response.code >= 400) {
        console.log('Analytics error: ', response)
        return null
    }

    return response.data
}