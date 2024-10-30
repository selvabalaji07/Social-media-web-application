import React, { useEffect } from 'react'
import {Link, useParams } from 'react-router-dom'

const EditPost = ({posts,handleEdit,editBody,setEditBody,editTitle,setEditTitle}) => {

  const  {id}=useParams();
  const post=posts.find(post => (post.id).toString()===id);
  useEffect(()=>{
    setEditTitle(post.title)
    setEditBody(post.body)
  },[post,setEditBody,setEditTitle]
)

  return (
    <main className='NewPost'>
      {editTitle &&
      <>
        <h2>Edit Post</h2>
        <form className='newPostForm' onSubmit={e=>e.preventDefault()}>
          <label htmlFor='postTitle'>Title:</label>
          <input id='postTitle' type='text' 
            required  value={editTitle} 
            onChange={e=>setEditTitle(e.target.value)}/>
          <label htmlFor='postBody'>Post:</label>
          <textarea id='postBody' type='text' 
            required  value={editBody} 
            onChange={e=>setEditBody(e.target.value)}/>
          <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>

        </form>
      </>
      }
      {!editTitle && <>
        <h2>Page Not Found</h2>
        <Link to='/'><p> Visit home page</p></Link>
      </>}
        
    </main>
  )
}

export default EditPost