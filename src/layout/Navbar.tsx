'use client'

import { Newspaper } from 'lucide-react'

import SearchComponent from '@/components/internal/search'
import SideBar from '@/components/internal/SideBar'

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex items-center h-16 px-4 justify-evenly">
                <div className="flex items-center w-1/2 gap-4 justify-evenly">
                    <div className="lg:hidden">
                        <SideBar />
                    </div>
                    <div className="flex items-center gap-2">
                        <Newspaper className="w-6 h-6" />
                        <span className="text-xl font-semibold">News</span>
                    </div>
                </div>

                <div className="hidden w-1/2 lg:block">
                    <SearchComponent />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
