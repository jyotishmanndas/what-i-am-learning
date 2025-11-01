import React from 'react'

const Card = ({ name, about, src }) => {
    return (
        <div className='card'>
            <img src={src} alt="" />

            <h1>{name}</h1>
            <p>{about}</p>
            <button>View Profile</button>
        </div>
    )
}
export default Card