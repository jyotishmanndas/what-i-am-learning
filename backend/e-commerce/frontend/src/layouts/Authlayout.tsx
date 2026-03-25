import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router'

const Authlayout = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100/80">
            <Navbar />
            <div className="flex min-h-screen flex-col pt-20">
                <Outlet />
            </div>
        </div>
    )
}

export default Authlayout