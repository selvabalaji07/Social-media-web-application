import React from 'react'
const date=new Date()
const Footer = () => {
  return (
    <h3 className='Footer'>Copyright &copy; {date.getFullYear()}</h3>
  )
}

export default Footer