import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Page1Content = ({users}) => {  
  return (
    <div className='px-12 py-3 h-[90vh] flex items-center gap-10'>
      <LeftContent />
      <RightContent users={users} />
    </div>
  )
}

export default Page1Content
