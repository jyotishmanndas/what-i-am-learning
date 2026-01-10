import React from 'react'
import SignatureModal from './components/modal/signatureModal'
import SignaturePad from './components/SignaturePad'


const App = () => {
  return (
    <div className='bg-black h-screen flex items-center justify-center'>
      <SignatureModal>
        <SignaturePad />
      </SignatureModal>
    </div>
  )
}

export default App