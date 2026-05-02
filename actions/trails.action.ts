import { tag } from "@/tags/trail.tag";
import { Trails } from "@/types/trails";
import { ServerApiClient } from "@/utils/api-server";
import { emptyMetaData } from "@/utils/empty-metadata";

export async function getTrails(options: PaginationParams = {}): Promise<Pagination<Trails>> {
    const response = await ServerApiClient.get<Pagination<Trails>>(`/trails?page=${options.page ?? 1}&limit=${options.limit ?? 10}`, {
        next: {tags: [tag.default]}
    })

    if (response.code >= 400) {
        console.log('trails error: ', response)
        return emptyMetaData
    }


    return response.data
}