import { createPost, getFeed, likePost, unlikePost } from "../services/feed.api";
import { useContext } from "react";
import { PostContext } from "../post.context";
import { useEffect } from "react";


export const usePost = () => {
    const context = useContext(PostContext)

    const { loading, setLoading, feed, setFeed, post, setPost } = context

    async function handleGetFeed() {

        setLoading(true)

        try {
            const data = await getFeed()
            setFeed(data.posts)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    async function handleCreatePost(imageFile, caption) {

        setLoading(true)

        try {
            const res = await createPost(imageFile, caption)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleLikePost(postId) {
        
        const res = await likePost(postId)
        await handleGetFeed()
    }
    
    async function handleUnlikePost(postId) {
        
        const res = await unlikePost(postId)
        await handleGetFeed()

    }

    useEffect(() => {
      handleGetFeed();
    }, [])
    

    return { loading, feed, post, setPost, handleGetFeed , handleCreatePost ,handleLikePost ,handleUnlikePost }
}