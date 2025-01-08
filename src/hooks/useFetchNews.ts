import axios from 'axios'
import { useEffect, useState } from 'react'

import { useUniversalStore } from '@/store/useUniversalStore'

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
const NYT_API_KEY = import.meta.env.VITE_NY_NEWS_KEY
const GUARDIAN_API_KEY = import.meta.env.VITE_THE_GUARDIAN_KEY

if (!NEWS_API_KEY || !NYT_API_KEY || !GUARDIAN_API_KEY) {
    throw new Error('Missing required environment variables')
}

export const useFetchNews = () => {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const { filters, searchQuery, newsChannels } = useUniversalStore()

    // Helper functions remain the same
    const fetchNewsAPI = async () => {
        const url = `https://newsapi.org/v2/everything?q=${searchQuery}&from=${filters.dateRange[0]}&to=${filters.dateRange[1]}&category=${filters.category}&sources=${filters.source}&apiKey=${NEWS_API_KEY}`
        const response = await axios.get(url)
        return response.data.articles
    }

    const fetchNYT = async () => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&begin_date=${filters.dateRange[0]}&end_date=${filters.dateRange[1]}&fq=section_name:("${filters.category}")&api-key=${NYT_API_KEY}`
        const response = await axios.get(url)
        return response.data.response.docs
    }

    const fetchGuardian = async () => {
        const url = `https://content.guardianapis.com/search?q=${searchQuery}&from-date=${filters.dateRange[0]}&to-date=${filters.dateRange[1]}&section=${filters.category}&api-key=${GUARDIAN_API_KEY}`
        const response = await axios.get(url)
        return response.data.response.results
    }

    const fetchData = async () => {
        setLoading(true)
        setError(null)
        try {
            const enabledChannels = newsChannels.filter(
                (channel) => channel.enabled
            )
            const fetchPromises = enabledChannels.map((channel) => {
                switch (channel.id) {
                    case 'news_api':
                        return fetchNewsAPI()
                    case 'new_york':
                        return fetchNYT()
                    case 'the_guardian':
                        return fetchGuardian()
                    default:
                        return Promise.resolve([])
                }
            })

            const results = await Promise.all(fetchPromises)
            const combinedResults = results.flat()
            setData(combinedResults)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [filters.category, filters.dateRange, filters.source, searchQuery])

    return { data, loading, error, refetch: fetchData }
}

export const useUrgentNews = () => {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
            const response = await axios.get(url)
            setData(response.data.articles)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, loading, error, refetch: fetchData }
}
