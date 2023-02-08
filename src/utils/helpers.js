const baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon';

export const asyncFetch = async (requestOptions, url = '') => {
    let statusCode = 0;

    const response = await fetch(baseUrl + url, requestOptions);

    statusCode = response.status;
    let responseJson;
    if (requestOptions.method === "DELETE") {
        responseJson = '';
    }
    else {
        responseJson = await response?.json();
    }

    return { responseJson, statusCode };
}

