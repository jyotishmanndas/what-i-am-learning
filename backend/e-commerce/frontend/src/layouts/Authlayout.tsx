import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router'

const Authlayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Authlayout