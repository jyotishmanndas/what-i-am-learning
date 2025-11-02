import React from 'react'
import { Bookmark } from "lucide-react"


const Card = ({ data }) => {
  return (
    <div className='parent-2'>
      {data.map((data, idx) => (
        <div key={idx} className='card'>
          <div className='top'>
            <img src={data.logo} alt="" />
            <span>Save <Bookmark className='bookmark' /></span>
          </div>

          <div className='center'>
            <div className='company'>
              <h3>{data.cname}</h3>
              <span>{data.postday} days ago</span>
            </div>
            <h2>{data.title}</h2>
            <div className='tags'>
              <h4>{data.tag1}</h4>
              <h4>{data.tag2}</h4>
            </div>
          </div>

          <div className="bottom">
            <div className="blft">
              <h2>${data.price}/hr</h2>
              <h5>{data.loc}</h5>
            </div>
            <button>Apply now</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card
