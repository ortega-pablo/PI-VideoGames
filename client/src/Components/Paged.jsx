import React from 'react'

export default function Paged({videogamesPerPage, allVideogames, paged}) {

    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allVideogames/videogamesPerPage) ; i++) {
        pageNumbers.push(i+1)
    }

    return (
    <nav>
        <ul>
            { pageNumbers &&
            pageNumbers.map(number => (
                <li key={number}>
                    <a onClick={()=>paged(number)}>{number}</a>
                </li>
            ))}
        </ul>
    </nav>
  )
}
