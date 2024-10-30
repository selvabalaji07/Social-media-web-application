import About from './About';
import Home from './Home';

import React, { useEffect, useState } from 'react';
import NewPost from './NewPost';
import PostPage from './PostPage'

import Missing from'./Missing'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import {format} from 'date-fns'
import { Route,Routes, useNavigate } from 'react-router-dom';
import api from './api/posts'
import EditPost from './EditPost';



function App() {
  const [posts,setPosts]=useState([])
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([]);
  const [ postTitle,setPostTitle]=useState('')
  const [postBody,setPostBody]=useState('')
  const [ editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')

  const navigate=useNavigate();
  useEffect(()=>{
    const fetchposts=async()=>{
      try{
        const response=await api.get("./posts")
        setPosts(response.data)

      }
      catch(err){
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
        }
        else{
          console.log(`Error: ${err.message}`)
        }

      }
    }
    fetchposts();
  },[])

  useEffect(()=>{
    const resfiltered = posts.filter(post => 
      ((post.body)?.toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title)?.toLowerCase()).includes(search.toLowerCase())
    );
    setSearchResults(resfiltered.reverse());  
  },[posts,search])


  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id=posts.length ? posts[posts.length-1].id + 1 : 1;
    const datetime = format(new Date(),'MMMM dd, yyyy pp');
    const newpost={id, title:postTitle,datetime,body:postBody}
    try{
        const response=await api.post("./posts",newpost)
        const allposts=[...posts,response.data]
        setPosts(allposts);
        navigate('/')
        setPostTitle('');
        setPostBody('');
    }
    catch(err){
        console.log(`Error: ${err.message}`)
      }
  }
  const handleEdit=async(id) =>{
    const datetime = format(new Date(),'MMMM dd, yyyy pp');
    const updatepost={id, title:editTitle,datetime,body:editBody}
    try{
      const response= await api.put(`/posts/${id}`,updatepost)
      setPosts(posts.map((post)=> post.id===id ? {...response.data}:post))
      setEditTitle('')
      setEditBody('')
      navigate("/")
    }
    catch(err){
      console.log(`Error: ${err.message}`)
    }
  }
  const handleDelete=async(id) =>{
    try{
        await api.delete(`posts/${id}`)
        const listedpost=posts.filter(post => post.id!==id) 
        setPosts(listedpost);
        navigate('/')
        }
    catch(err){
      console.log(`Error: ${err.message}`)
    }
    
  }
  return (
    <div className="App">
      <Header title="Blite Social Media "/>
      <Nav search={search}  setSearch={setSearch}/>
      <Routes>
         <Route path='/' element={<Home posts={searchResults}/>}/>
         <Route path='/post'>
             <Route index element={<NewPost handleSubmit={handleSubmit}
              postBody={postBody}
              postTitle={postTitle}
              setPostBody={setPostBody}
              setPostTitle={setPostTitle}
              />}/>
              <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
            </Route> 
            <Route path='/edit/:id' element={<EditPost posts={posts} 
                    handleEdit={handleEdit}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    editBody={editBody}
                    setEditBody={setEditBody}    
               />}/>
          <Route path='/about' element={<About/>}/>
          <Route path='*' element={<Missing/>}/> 
      </Routes>
      <Footer/>
      
    </div>
  );
}

export default App;
