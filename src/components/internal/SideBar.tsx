'use client'

import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

import SideFilters from './SideFilters'

export default function SideBar() {
    return (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed top-4 left-4"
                >
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
    )
}
