import axios from 'axios'
import { useEffect, useState } from 'react'

import {
    GuardianAPITypes,
    NewsAPITypes,
    NYTimesTypes
} from '@/components/internal/types'
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
        try {
            // const url = `https://newsapi.org/v2/everything?q=${searchQuery}&from=${filters.dateRange[0]}&to=${filters.dateRange[1]}&category=${filters.category}&sources=${filters.source}&apiKey=${NEWS_API_KEY}`
            const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
            const response = await axios.get(url)
            const formattedArticles = response.data.articles.map(
                (article: NewsAPITypes) => ({
                    title: article.title,
                    content: article.content,
                    author: article.author,
                    description: article.description,
                    publishedAt: article.publishedAt,
                    source: article.source,
                    url: article.url,
                    urlToImage: article.urlToImage
                })
            )

            return formattedArticles
        } catch (error) {
            console.log(error)
        }
    }

    const fetchNYT = async () => {
        try {
            const url = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${NYT_API_KEY}`
            const response = await axios.get(url)
            console.log(response.data.results)

            const formattedArticles = response.data.results.map(
                (article: NYTimesTypes) => ({
                    title: article.title,
                    content: article.abstract, // Using abstract as content since NYT API doesn't provide full content
                    author: article.byline.replace('By ', ''), // Remove 'By ' prefix from byline
                    description: article.abstract,
                    publishedAt: article.created_date,
                    source: { id: 'nytimes', name: 'New York Times' },
                    url: article.url,
                    urlToImage: article.multimedia?.[0]?.url || '' // Get the first multimedia image URL if available
                })
            )

            return formattedArticles
        } catch (error) {
            console.log(error)
        }
    }

    const fetchGuardian = async () => {
        try {
            const url = `https://content.guardianapis.com/search?from-date=2025-01-01&to-date=2025-01-03&page-size=20&api-key=${GUARDIAN_API_KEY}`
            const response = await axios.get(url)
            console.log(response)

            const formattedArticles = response.data.response.results.map(
                (article: GuardianAPITypes) => ({
                    title: article.webTitle,
                    content: '', // Guardian API doesn't provide content in this endpoint
                    author: '', // Guardian API doesn't provide author in this endpoint
                    description: '', // Guardian API doesn't provide description in this endpoint
                    publishedAt: article.webPublicationDate,
                    source: { id: 'guardian', name: 'The Guardian' },
                    url: article.webUrl,
                    urlToImage: '' // Guardian API doesn't provide images in this endpoint
                })
            )

            return formattedArticles
        } catch (error) {
            console.log(error)
        }
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

            // Fisher-Yates shuffle algorithm
            const shuffledResults = [...combinedResults]
            for (let i = shuffledResults.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[shuffledResults[i], shuffledResults[j]] = [
                    shuffledResults[j],
                    shuffledResults[i]
                ]
            }

            setData(shuffledResults)
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
