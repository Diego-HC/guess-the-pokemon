import { useEffect, useState } from "react";
import { apiCaller, fetchImage } from "./ApiCaller";
import "./App.css";

function App() {
    const [pokemonImage, setPokemonImage] = useState<string>("");
    const [pokemonName, setPokemonName] = useState("");
    const [blurLevel, setBlurLevel] = useState(5);
    const [blurClassname, setBlurClassname] = useState("");
    const [guess, setGuess] = useState("");
    const [pokemonId, setPokemonId] = useState(0);
    const [generation, setGeneration] = useState(0); // 0 = all, 1 = gen 1, 2 = gen 2, etc
    const [dialogText, setDialogText] = useState("You have lost the game!");

    const randomPokemon = (generation: number) => {
        console.log("generating random pokemon", generation);
        switch (generation) {
            case 1:
                setPokemonId(Math.floor(Math.random() * 151) + 1);
                break;
            case 2:
                setPokemonId(Math.floor(Math.random() * 100) + 152);
                break;
            case 3:
                setPokemonId(Math.floor(Math.random() * 135) + 252);
                break;
            case 4:
                setPokemonId(Math.floor(Math.random() * 107) + 387);
                break;
            case 5:
                setPokemonId(Math.floor(Math.random() * 156) + 494);
                break;
            case 6:
                setPokemonId(Math.floor(Math.random() * 72) + 650);
                break;
            case 7:
                setPokemonId(Math.floor(Math.random() * 88) + 722);
                break;
            case 8:
                setPokemonId(Math.floor(Math.random() * 96) + 810);
                break;
            case 9:
                setPokemonId(Math.floor(Math.random() * 114) + 906);
                break;
            default:
                setPokemonId(Math.floor(Math.random() * 898) + 1);
        }

        setDialogText("You have lost!");
    };

    const getImage = async (url: string) => {
        setPokemonImage("");
        const data = await fetchImage(url);
        setPokemonImage(data);
    };

    useEffect(() => {
        console.log("generation changed", generation);
        randomPokemon(generation);
    }, [generation]);

    useEffect(() => {
        const blurClassnames: { [key: number]: string } = {
            0: "blur-none",
            1: "blur-md",
            2: "blur-lg",
            3: "blur-xl",
            4: "blur-2xl",
            5: "blur-3xl",
        };

        const setBlur = (blur: number) => {
            setBlurLevel(blur);
            setBlurClassname(blurClassnames[blur]);
        };

        const getPokemon = async () => {
            setBlur(5);

            setPokemonName("");
            const data = await apiCaller(pokemonId);

            await getImage(
                data["sprites"]["other"]["official-artwork"]["front_default"]
            );
            setPokemonName(data.name);
        };

        getPokemon();
    }, [pokemonId]);

    const changeBlur = () => {
        setBlur(blurLevel - 1);
    };

    const setBlur = (blur: number) => {
        const blurClassnames: { [key: number]: string } = {
            0: "blur-none",
            1: "blur-md",
            2: "blur-lg",
            3: "blur-xl",
            4: "blur-2xl",
            5: "blur-3xl",
        };

        setBlurLevel(blur);
        setBlurClassname(blurClassnames[blur]);
    };

    const checkPokemonName = (name: string) => {
        if (blurLevel === 0) return;

        console.log("checking pokemon name", name);
        if (name === pokemonName) {
            setDialogText("Correct!");
            setBlur(0);
        } else if (blurLevel === 1) {
            setBlur(0);
        } else if (name !== "") {
            changeBlur();
        } else {
            changeBlur();
        }

        setGuess("");
    };

    return (
        <div>
            <h1 className="text-6xl mb-8">Guess the Pokemon</h1>
            <div className="flex flex-row py-5 justify-between">
                <button
                    className="bg-blue-500 text-white p-5 rounded-2xl"
                    onClick={() => randomPokemon(generation)}
                >
                    New Pokemon
                </button>
                <h2 className="text-4xl self-center">
                    {blurLevel === 0 ? dialogText : ""}
                </h2>
                <select
                    className="text-black rounded-2xl px-5 "
                    onChange={(event) =>
                        setGeneration(parseInt(event.target.value))
                    }
                >
                    <option value={0}>All</option>
                    <option value={1}>Gen 1</option>
                    <option value={2}>Gen 2</option>
                    <option value={3}>Gen 3</option>
                    <option value={4}>Gen 4</option>
                    <option value={5}>Gen 5</option>
                    <option value={6}>Gen 6</option>
                    <option value={7}>Gen 7</option>
                    <option value={8}>Gen 8</option>
                    <option value={9}>Gen 9</option>
                </select>
            </div>
            <div className="flex flex-col">
                <h2 className={blurLevel === 0 ? "" : "invisible"}>
                    {blurLevel === 0
                        ? pokemonName.charAt(0).toUpperCase() +
                          pokemonName.slice(1)
                        : ""}
                </h2>
                {pokemonImage === "" || pokemonName === "" ? (
                    <div
                        className="self-center m-48 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                    >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                        </span>
                    </div>
                ) : (
                    <img
                        className={`${blurClassname} h-96 self-center mb-8`}
                        src={pokemonImage}
                    />
                )}
                <div className="flex flex-row gap-5">
                    <input
                        className="rounded-2xl px-5 py-3 text-black"
                        onChange={(event) => setGuess(event.target.value)}
                        type="text"
                        placeholder="Pokemon Name"
                        value={guess}
                        onSubmit={() => checkPokemonName(guess)}
                    />
                    <button
                        className="bg-green-600 text-white px-5 py-3 rounded-2xl"
                        disabled={blurLevel === 0}
                        onClick={() => checkPokemonName(guess)}
                    >
                        Guess
                    </button>
                    <button
                        className="bg-yellow-500 text-white px-5 py-3 rounded-2xl"
                        onClick={() => checkPokemonName("")}
                    >
                        Skip
                    </button>
                    <button
                        className="bg-red-500 text-white px-5 py-3 rounded-2xl"
                        onClick={() => {
                            if (blurLevel > 0) setBlur(0);
                        }}
                    >
                        Give up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
