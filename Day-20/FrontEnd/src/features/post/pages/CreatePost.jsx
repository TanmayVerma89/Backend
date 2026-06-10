import React from 'react'
import "../styles/createPost.scss"
import { useState } from 'react';
import { useRef } from 'react';
import { usePost } from '../hooks/usePost';
import { useNavigate } from 'react-router';

const CreatePost = () => {

  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);

  const {loading , handleCreatePost} = usePost();

  const navigate = useNavigate();

  if (loading) {
      return (
        <main>
          <h1>Creating Post...</h1>
        </main>
      )
    }

  async function handleSubmit(e) {
    e.preventDefault();

    const imageFile = postImageInputFieldRef.current.files[0];

    if (!imageFile) {
      alert("Please select an image to upload.")
      return;
    }

    await handleCreatePost(imageFile, caption)

    navigate("/")

  }

  return (
    <main>
      <div className="form-container">
        <div className="top">
          <h1>Create New Post</h1>
          <div className='head'>Share your moments with the world.</div>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='image' className='select-file-label'><span className='select-file-label-text'>Select Image</span>
            <input ref={postImageInputFieldRef} type="file" hidden placeholder='Image URL' name='image' id='image' />
          </label>
          <label htmlFor='caption'><span>Caption</span>
            <input
              value={caption}
              onChange={(e) => { setCaption(e.target.value) }}
              type="text" placeholder='Caption' name='caption' id='caption' />
          </label>
          <div className="separator"></div>
          <button type='submit'>Create Post</button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost