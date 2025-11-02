import { ArrowRight } from "lucide-react"

function RightCard({ users }) {
    return (
        <>
            {users.map((data, idx) => (
                <div key={idx} className="h-full shrink-0 w-80 overflow-hidden relative rounded-4xl">
                    <img className="h-full w-full object-cover rounded-4xl" src={data.img} alt="" />

                    <div className="absolute h-full w-full top-0 left-0 px-8 py-10 flex flex-col justify-between">
                        <h2 className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center font-semibold text-xl">{idx+1}</h2>

                        <div>
                            <p className="text-lg leading-relaxed text-white mb-14">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore ratione quia, mollitia asperiores molestias quam?</p>

                            <div className="flex items-center justify-between">
                                <button className="py-2 px-6 bg-blue-500 rounded-full text-white font-medium">{data.tag}</button>
                                <button className="py-2 px-2 bg-blue-500 rounded-full text-white font-medium"><ArrowRight /></button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default RightCard
