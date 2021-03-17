import Socket from "./Socket";
import { baseUrl, movieEPs } from "../config/config.json";
import Gateway from "./Gateway";

export async function search(header_info, QueryString) {
    const response = await Socket.GET({
        baseURL: baseUrl,
        url: `${movieEPs.searchEP}?${QueryString}`,
        headers: {...header_info},
    });
    return await Gateway.getReport(response, header_info);
}

export async function browse(header_info, QueryString) {
    const response = await Socket.GET({ 
        url: `${baseUrl}${movieEPs.browseEP}/${QueryString}`, 
        headers: {...header_info},
    });
    return await Gateway.getReport(response, header_info);
}

export async function get(header_info, movie_id) {
    const response = await Socket.GET({ 
        url: `${baseUrl}${movieEPs.getEP}/${movie_id}`, 
        headers: {...header_info},
    });
    return await Gateway.getReport(response, header_info);
}


export const movie_services = { search, browse, get };
export default { ...movie_services };
