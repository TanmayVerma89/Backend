import React, { useEffect } from 'react'
import "../styles/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/components/Nav'

const Feed = () => {
    const { loading, feed, handleGetFeed ,handleLikePost, handleUnlikePost } = usePost()

    if (loading && feed.length === 0) {
        return <main><h1>Feed is Loading</h1></main>
    }
    

    return (
        <main >
            <Nav />
            <div className="feed-page">
                <div className="posts">
                    {feed.map((post) => (
                        <Post key={post._id} post={post} user={post.user} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost} />
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Feed