import Socket from "./Socket";
import { baseUrl, billingEPs } from "../config/config.json";
import Gateway from "./Gateway";
// insert, update, delete, retrieve
export async function insert(header_info, data) {
    const response = await Socket.POST({
        baseURL: baseUrl,
        url: billingEPs.insertEP,
        headers: {...header_info},
        data: data
    });
    return await Gateway.getReport(response, header_info);
}

export async function update(header_info, data) {
    const response = await Socket.POST({
        baseURL: baseUrl,
        url: billingEPs.updateEP,
        headers: {...header_info},
        data: data
    });
    return await Gateway.getReport(response, header_info);
}

export async function delete_cart_item(header_info, movie_id) {
    const response = await Socket.POST({
        baseURL: baseUrl,
        url: billingEPs.deleteEP,
        headers: {...header_info},
        data: {
            email: header_info.email,
            movie_id: movie_id
        },
    });
    return await Gateway.getReport(response, header_info);
}

export async function clear_cart(header_info) {
    // data = {email}
    const response = await Socket.POST({
        baseURL: baseUrl,
        url: billingEPs.clearEP,
        headers: {...header_info},
        data: { email: header_info.email}
    });
    return await Gateway.getReport(response, header_info);
}

export async function retrieve(header_info, data) {
    const response = await Socket.POST({
        baseURL: baseUrl,
        url: billingEPs.retrieveEP,
        headers: {...header_info},
        data: data
    });
    return await Gateway.getReport(response, header_info);
}

export async function place_order(header_info) {
    // data = {email}
    const response = await Socket.POST({
        baseURL: baseUrl,
        url: billingEPs.placeEP,
        headers: {...header_info},
        data: { email: header_info.email}
    });
    return await Gateway.getReport(response, header_info);
}

export async function get_transactions(header_info) {
    const response = await Socket.POST({
        baseURL: baseUrl,
        url: billingEPs.transactionsEP,
        headers: {...header_info},
        data: { email: header_info.email}
    });
    return await Gateway.getReport(response, header_info);
}

export const cart_services = { 
    insert, 
    update, 
    delete_cart_item, 
    clear_cart, 
    retrieve, 
    place_order, 
    get_transactions
};
export default { ...cart_services };