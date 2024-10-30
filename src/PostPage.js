import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({posts,handleDelete}) => {
  const {id}=useParams();
  const post= posts.find(post=>(post.id).toString()===id);
  return (
    <main className='PostPage'>
    <article className='post'>
      {post && <>
        <h2>{post.title}</h2>
        <p className='postDate'>{post.datetime}</p>
        <p className='postBody'>{post.body}</p>
        <Link to={`/edit/${post.id}`}>
          <button className='editButton'>Edit Post</button>
        </Link>
        <button className='deleteButton'onClick={()=> handleDelete(post.id)}>
          Delete post
        </button>
      </>}
      {!post && <>
        <h2>Page Not Found</h2>
        <Link to='/'><p> Visit home page</p></Link>
      </>}

    </article>
    
    </main>
  )
}

export default PostPage