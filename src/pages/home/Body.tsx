import NewsFeed from '@/components/internal/NewsFeed'
import SideFilters from '@/components/internal/SideFilters'
import UrgentNews from '@/components/internal/UrgentNews'

const Body = () => {
    return (
        <div className="flex flex-col justify-around w-full gap-5 mt-20 lg:flex-row">
            <span className="hidden lg:block">
                <SideFilters />
            </span>
            <NewsFeed />
            <UrgentNews />
        </div>
    )
}

export default Body
