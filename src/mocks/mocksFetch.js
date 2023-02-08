const response = {
    results: [
        {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/"
        },
    ]
}

export default async function mockFetch(url) {
    return {
        ok: true,
        status: 200,
        json: async () => response,
    };
}