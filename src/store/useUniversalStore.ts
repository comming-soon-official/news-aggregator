import { create } from 'zustand'

type NewsChannel = {
    id: string
    name: string
    enabled: boolean
}

export type StoreTypes = {
    newsChannels: NewsChannel[]
    articles: string[]
    searchQuery: string
    filters: {
        dateRange: [Date, Date]
        category: string
        source: string
    }
    toggleChannel: (channelId: string) => void
    write: (state: Partial<StoreTypes>) => void
}

const defaultChannels: NewsChannel[] = [
    { id: 'news_api', name: 'News API', enabled: true },
    { id: 'new_york', name: 'New York Times', enabled: true },
    { id: 'the_guardian', name: 'The Guardian', enabled: true }
]

export const useUniversalStore = create<StoreTypes>((set) => ({
    newsChannels: defaultChannels,
    articles: [],
    searchQuery: '',
    filters: {
        dateRange: [
            new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
            new Date(new Date().setHours(23, 59, 59, 999)) // End of today
        ],
        category: '',
        source: ''
    },
    toggleChannel: (channelId) =>
        set((state) => ({
            newsChannels: state.newsChannels.map((channel) =>
                channel.id === channelId
                    ? { ...channel, enabled: !channel.enabled }
                    : channel
            )
        })),
    write: (state) => set(state)
}))
