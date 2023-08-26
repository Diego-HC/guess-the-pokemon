async function apiCaller(number: number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    const data = await response.json();

    return data;
}

const fetchImage = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    const data = await response.blob();

    return URL.createObjectURL(data);
};

export { apiCaller, fetchImage };
