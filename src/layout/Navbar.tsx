'use client'

import { ListFilter, MenuIcon, Newspaper, Search } from 'lucide-react'

import SideFilters from '@/components/internal/SideFilters'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'

const Navbar = () => {
    return (
        <>
            <div className="flex items-center justify-around p-4">
                <div className="flex items-center gap-2 text-2xl">
                    {/* Only show drawer on small screens */}
                    <div className="lg:hidden">
                        <Drawer direction="left">
                            <DrawerTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MenuIcon className="w-4 h-4" />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="w-[380px]">
                                <div className="h-screen overflow-y-auto bg-background">
                                    <div className="px-6 py-8">
                                        <h1 className="mb-8 text-2xl font-bold">
                                            News Filters
                                        </h1>
                                        <SideFilters />
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
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
        </>
    )
}

export default Navbar
