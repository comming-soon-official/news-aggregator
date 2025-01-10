import { useUniversalStore } from '@/store/useUniversalStore'

import { Badge } from '../ui/badge'
import { DateRangePicker } from '../ui/date-rangee-picker'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'
import { Separator } from '../ui/separator'
import SearchComponent from './search'

const SideFilters = () => {
    const { newsChannels, toggleChannel, filters, write } = useUniversalStore()
    const categories = [
        { value: 'business', label: 'Business' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'general', label: 'General' },
        { value: 'health', label: 'Health' },
        { value: 'science', label: 'Science' },
        { value: 'sports', label: 'Sports' },
        { value: 'technology', label: 'Technology' }
    ]

    const sources = [
        { value: 'bbc-news', label: 'BBC News' },
        { value: 'cnn', label: 'CNN' },
        { value: 'reuters', label: 'Reuters' },
        { value: 'the-wall-street-journal', label: 'The Wall Street Journal' },
        { value: 'bloomberg', label: 'Bloomberg' },
        { value: 'associated-press', label: 'Associated Press' },
        { value: 'the-washington-post', label: 'The Washington Post' }
    ]
    const handleDateChange = (values: {
        range: { from?: Date; to?: Date }
    }) => {
        const { from, to } = values.range
        if (from && to) {
            write({
                filters: {
                    ...filters,
                    dateRange: [from, to]
                }
            })
        }
    }

    const handleCategoryChange = (selectedOption: string) => {
        console.log(selectedOption)

        write({
            filters: {
                ...filters,
                category: selectedOption
            }
        })
    }

    const handleSourceChange = (selectedOption: string) => {
        write({
            filters: {
                ...filters,
                source: selectedOption
            }
        })
    }
    return (
        <div className="space-y-8 ">
            <section className="block lg:hidden">
                <SearchComponent />
            </section>
            <section>
                <h2 className="mb-4 text-lg font-semibold">News Sources</h2>
                <div className="flex flex-wrap gap-2">
                    {newsChannels.map((channel) => (
                        <Badge
                            className="transition-colors hover:cursor-pointer"
                            key={channel.id}
                            variant={channel.enabled ? 'default' : 'outline'}
                            onClick={() => toggleChannel(channel.id)}
                        >
                            {channel.name}
                        </Badge>
                    ))}
                </div>
            </section>

            <Separator />

            <section className="space-y-6">
                <h2 className="text-lg font-semibold">Filters</h2>

                <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">
                            Date Range
                        </label>
                        <DateRangePicker
                            onUpdate={handleDateChange}
                            initialDateFrom={filters.dateRange[0]}
                            initialDateTo={filters.dateRange[1]}
                            align="start"
                            locale="en-GB"
                            showCompare={false}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select onValueChange={handleCategoryChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Source</label>
                        <Select onValueChange={handleSourceChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                                {sources.map((source) => (
                                    <SelectItem
                                        key={source.value}
                                        value={source.value}
                                    >
                                        {source.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SideFilters
