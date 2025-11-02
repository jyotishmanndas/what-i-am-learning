import React from 'react'
import RightCard from './RightCard'

const RightContent = ({users}) => {
    return (
        <div id='right' className='h-full overflow-auto flex flex-nowrap gap-8 w-2/3 p-2'>
            <RightCard users={users} />
        </div>
    )
}

export default RightContent
