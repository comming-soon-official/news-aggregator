import { ListFilter, Newspaper, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Navbar = () => {
    return (
        <div className="flex items-center justify-around">
            <div className="flex items-center gap-2 text-2xl">
                <Newspaper />
                <p className="font-semibold">News</p>
            </div>
            <div className="flex items-center w-1/2 gap-2 lg:w-1/3">
                <Input type="search" placeholder="Search" />
                <Button>
                    <ListFilter />
                </Button>
                <Button className="flex items-center">
                    <Search className="-mt-1" />
                    Search
                </Button>
            </div>
        </div>
    )
}

export default Navbar
