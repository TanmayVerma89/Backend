import { createContext, useState } from 'react';

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState({
        url: "https://ik.imagekit.io/TanmayDoTio/cohort-2/moodify/songs/Peachesmp3_MdLXi1k221",
        posterUrl: "https://ik.imagekit.io/TanmayDoTio/cohort-2/moodify/songPosters/Peachesjpeg_18UxFpZeP",
        title: "Peaches",
        mood: "surprised"
    })

    const [loading, setLoading] = useState(false);

    return (
        <SongContext.Provider value={{ loading, setLoading, song, setSong }}>
            {children}
        </SongContext.Provider>
    )

}