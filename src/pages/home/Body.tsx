import React from 'react'

import NewsFeed from '@/components/internal/NewsFeed'
import SideFilters from '@/components/internal/SideFilters'
import UrgentNews from '@/components/internal/UrgentNews'

const Body = () => {
    return (
        <div className="flex justify-around w-full gap-5 mt-20">
            <SideFilters />
            <NewsFeed />
            <UrgentNews />
        </div>
    )
}

export default Body
