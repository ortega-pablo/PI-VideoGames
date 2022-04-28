import React from 'react'
import { Link } from 'react-router-dom'
import sty from "./LandingPage.module.css"

export default function LandingPage() {
  return (
    <div className={sty.container}>
      <div>
      <h1 className={sty.title}>Welcome</h1>
      <Link to="/home">
        <button className={sty.btn}>Enter</button>
      </Link>
      </div>
      
    </div>
  )
}
