import { baseUrl, gatewayEPs, pollLimit } from "../config/config.json";
import Socket from "./Socket";

async function getReport(response, request_headers={}) {
	let noContent = 204;

	if (response.status !== noContent) return response;

	const props = {
		headers: {
			...request_headers,
			transaction_id: response.headers["transaction_id"],
		},
		baseURL: baseUrl,
		url: gatewayEPs.reportEP,
	};
	console.log(props)
	for (let i = 0; i < pollLimit; i++) {
		const response = await Socket.GET(props);

		if (response.status !== noContent) {
			/**********************************************
				TODO More Robust checking for response
			**********************************************/
			console.log("RESPONSE: ", response);
			return response;
		} else await timeOut();
	}

	/**********************************************
		TODO Better missing response management
	**********************************************/
	if(response.status !== noContent) {
		console.log("ERROR RESPONSE: ", response);
		console.log("RETURNING UNDEFINED")
		return undefined;
	}
	return {
		status:noContent,
		data: { response: response, request_headers: request_headers }
	};
}

async function timeOut() {
	return new Promise((resolve) => {
		let pollingTimeoutMilliSeconds = 100;
		setTimeout(() => resolve(), pollingTimeoutMilliSeconds);
	});
}

export default {
	getReport,
};
