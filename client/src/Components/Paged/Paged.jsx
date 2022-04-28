import React from 'react'
import sty from "./Paged.module.css"

export default function Paged({videogamesPerPage, allVideogames, paged}) {

    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allVideogames/videogamesPerPage) ; i++) {
        pageNumbers.push(i+1)
    }

    return (
    <div className={sty.container}>
            { pageNumbers &&
            pageNumbers.map(number => (
                <button key={number} className={sty.btn} onClick={()=>paged(number)}>{number}</button>
                
            ))}
    </div>
  )
}
