import { Search } from 'lucide-react'
import { useState } from 'react'

import { useUniversalStore } from '@/store/useUniversalStore'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

const SearchComponent = () => {
    const [input, setInput] = useState('')
    const { write } = useUniversalStore()

    const handleSubmit = () => {
        if (!input.trim()) return
        write({ searchQuery: input.trim() })
    }

    return (
        <div className="flex items-center w-full max-w-2xl gap-2">
            <div className="relative flex-1">
                <Input
                    type="search"
                    placeholder="Search news..."
                    className="w-full pr-8"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
            </div>
            <Button
                size="sm"
                className="flex items-center gap-2"
                onClick={handleSubmit}
            >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
            </Button>
        </div>
    )
}

export default SearchComponent
