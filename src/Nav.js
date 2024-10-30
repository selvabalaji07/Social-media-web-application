import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search,setSearch}) => {
  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={e=>e.preventDefault()}>
        <label htmlFor='search'>Search Post</label>
        <input type='text' id='search' placeholder='Search here'
               value={search}
               onChange={e=>setSearch(e.target.value)}
        />
        <div className="navLinks">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/post">Post</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
              

      </form>
    </nav>
  )
}

export default Nav