import FaceTest from '../../expressions/pages/FaceTest'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import '../styles/home.scss'

const Home = () => {

    const { handleGetSong } = useSong()

    return (
        <div className="home">
            <FaceTest
                getSong={(mood) => {
                    handleGetSong(mood)
                }}
            />
            <Player />
        </div>
    )
}

export default Home
