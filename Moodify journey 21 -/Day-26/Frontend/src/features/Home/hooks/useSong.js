import { useContext } from "react"
import { SongContext } from "../song.context"
import { getSong } from "../service/song.api";


export const useSong = () => {
    const context = useContext(SongContext);
    const { loading, setLoading, song, setSong } = context;

    async function handleGetSong(mood) {
        setLoading(true)

        try {
            const data = await getSong(mood)

            if (!data.song) {
                throw new Error(`No song is available for the ${mood} mood.`)
            }

            setSong(data.song)
            return data.song
        } finally {
            setLoading(false) 
        }
    }

    return ({ song, loading, handleGetSong })
}
