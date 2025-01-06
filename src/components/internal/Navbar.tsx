import { ListFilter, Newspaper, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { Button } from '../ui/button'

const Navbar = () => {
    return (
        <div className="flex justify-around items-center">
            <div className="text-2xl flex gap-2 items-center">
                <Newspaper />
                <p className="font-semibold">News</p>
            </div>
            <div className="flex w-1/3 items-center gap-2">
                <Input type="search" placeholder="Search" />
                <Button>
                    <ListFilter />
                </Button>
                <Button className="items-center flex">
                    <Search className="-mt-1" />
                    Search
                </Button>
            </div>
        </div>
    )
}

export default Navbar
