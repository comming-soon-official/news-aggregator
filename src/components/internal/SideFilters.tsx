import React from 'react'

import { Button } from '../ui/button'

const SideFilters = () => {
    return (
        <div className="w-1/3 ">
            <div>
                <div>
                    <h2 className="items-start text-2xl font-semibold">
                        News APi's
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <Button>News API</Button>
                        <Button>News API</Button>
                        <Button>News API</Button>
                        <Button>News API</Button>
                        <Button>News API</Button>
                        <Button>News API</Button>
                        <Button>News API</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideFilters
