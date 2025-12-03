import React from 'react'
import useSWR from 'swr'
import UsersCard from '../components/UsersCard';


const fetcher = async (url) => {
    const data = await fetch(url);
    const json = await data.json();
    return json;
}

const SwrFetching = () => {
    const { data, error, isLoading } = useSWR("https://fakestoreapi.com/users", fetcher);

    if (error) {
        return (
            <div>
                Failed to load
            </div>
        )
    }

    return (
        <div className='h-[80%] w-full flex items-center justify-center'>
            {isLoading ? (
                <div>loading</div>
            ) : (
                <div>
                    {data.map((user) => (
                        <UsersCard key={user.id} user={user} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default SwrFetching

