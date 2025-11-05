import React from 'react'

const Card = ({ item }) => {
    return (
        <a href={item.url} target="_blank">
            <div className='h-50 w-64 overflow-hidden rounded-xl'>
                <img className='h-full w-full object-cover' src={item.download_url} alt="" />
            </div>
        </a>
    )
}

export default Card
