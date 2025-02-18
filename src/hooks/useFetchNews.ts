import axios from 'axios'
import { useEffect, useState } from 'react'

import { GuardianAPITypes, NewsAPITypes } from '@/components/internal/types'
import { useUniversalStore } from '@/store/useUniversalStore'

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
const NYT_API_KEY = import.meta.env.VITE_NY_NEWS_KEY
const GUARDIAN_API_KEY = import.meta.env.VITE_THE_GUARDIAN_KEY

if (!NEWS_API_KEY || !NYT_API_KEY || !GUARDIAN_API_KEY) {
    throw new Error('Missing required environment variables')
}

type NewsArticle = {
    title: string
    content: string
    author: string
    description: string
    publishedAt: string
    source: { id: string; name: string }
    url: string
    urlToImage: string
    api_source: string
}

type FilterParams = Record<string, string | undefined>

const buildQueryParams = (params: FilterParams): string =>
    Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
        .join('&')

const fetchFromAPI = async (
    url: string,
    transformFn: (data: any) => NewsArticle[]
): Promise<NewsArticle[]> => {
    try {
        const response = await axios.get(url)
        return transformFn(response.data)
    } catch (error) {
        console.error(`Error fetching data from ${url}`, error)
        throw new Error(`Failed to fetch data from API.`)
    }
}

export const useFetchNews = () => {
    const [data, setData] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const { filters, searchQuery, newsChannels } = useUniversalStore()

    const buildNewsAPIUrl = (): string => {
        let params: Record<string, any> = {
            q: searchQuery || 'news',
            language: 'en',
            apiKey: NEWS_API_KEY
        }

        if (filters.dateRange?.[0]) {
            params.from = new Date(filters.dateRange[0])
                .toISOString()
                .split('T')[0]
        }
        if (filters.dateRange?.[1]) {
            params.to = new Date(filters.dateRange[1])
                .toISOString()
                .split('T')[0]
        }

        if (filters.source) {
            params.sources = filters.source
        } else {
            params.category = filters.category || 'general'
        }

        return `https://newsapi.org/v2/top-headlines?${buildQueryParams(
            params
        )}`
    }

    const buildNYTUrl = (): string => {
        if (filters.category && !searchQuery) {
            return `https://api.nytimes.com/svc/topstories/v2/${filters.category}.json?api-key=${NYT_API_KEY}`
        }

        const params = buildQueryParams({
            q: searchQuery || 'latest',
            begin_date:
                filters.dateRange?.[0] &&
                new Date(filters.dateRange[0])
                    .toISOString()
                    .split('T')[0]
                    .replace(/-/g, ''),
            end_date:
                filters.dateRange?.[1] &&
                new Date(filters.dateRange[1])
                    .toISOString()
                    .split('T')[0]
                    .replace(/-/g, ''),
            sort: 'relevance',
            'api-key': NYT_API_KEY
        })

        return `https://api.nytimes.com/svc/search/v2/articlesearch.json?${params}`
    }

    const buildGuardianUrl = (): string => {
        const params = buildQueryParams({
            'from-date':
                filters.dateRange?.[0] &&
                new Date(filters.dateRange[0]).toISOString().split('T')[0],
            'to-date':
                filters.dateRange?.[1] &&
                new Date(filters.dateRange[1]).toISOString().split('T')[0],
            q: searchQuery || 'news', // Default query
            'api-key': GUARDIAN_API_KEY
        })

        return `https://content.guardianapis.com/search?${params}`
    }

    const transformNewsAPI = (data: any): NewsArticle[] =>
        data.articles?.map((article: NewsAPITypes) => ({
            title: article.title,
            content: article.content || '',
            author: article.author || 'Unknown',
            description: article.description || '',
            publishedAt: article.publishedAt,
            source: article.source,
            url: article.url,
            urlToImage: article.urlToImage || '',
            api_source: 'NewsAPI'
        })) || []

    const transformNYT = (data: any): NewsArticle[] =>
        data?.response?.docs?.map((article: any) => ({
            title: article.headline?.main || 'No title',
            content: article.lead_paragraph || '',
            author: article.byline?.original || 'Unknown',
            description: article.abstract || '',
            publishedAt: article.pub_date,
            source: { id: 'nyt', name: 'The New York Times' },
            url: article.web_url,
            urlToImage:
                article.multimedia?.length > 0
                    ? `https://www.nytimes.com/${article.multimedia[0].url}`
                    : '',
            api_source: 'NY Times'
        })) || []

    const transformNYTTopStories = (data: any): NewsArticle[] =>
        data?.results?.map((article: any) => ({
            title: article.title || 'No title',
            content: article.abstract || '',
            author: article.byline || 'Unknown',
            description: article.abstract || '',
            publishedAt: article.published_date,
            source: { id: 'nyt', name: 'The New York Times' },
            url: article.url,
            urlToImage: article.multimedia?.[0]?.url || '',
            api_source: 'NY Times'
        })) || []

    const transformGuardian = (data: any): NewsArticle[] =>
        data?.response?.results?.map((article: GuardianAPITypes) => ({
            title: article.webTitle,
            content: '',
            author: '',
            description: '',
            publishedAt: article.webPublicationDate,
            source: { id: 'guardian', name: 'The Guardian' },
            url: article.webUrl,
            urlToImage: '',
            api_source: 'Guardian'
        })) || []

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
                        return fetchFromAPI(buildNewsAPIUrl(), transformNewsAPI)
                    case 'new_york':
                        const nytUrl = buildNYTUrl()
                        const transformFn = nytUrl.includes('topstories')
                            ? transformNYTTopStories
                            : transformNYT
                        return fetchFromAPI(nytUrl, transformFn)
                    case 'the_guardian':
                        return fetchFromAPI(
                            buildGuardianUrl(),
                            transformGuardian
                        )
                    default:
                        return Promise.resolve([])
                }
            })

            const results = await Promise.allSettled(fetchPromises)

            const combinedResults = results
                .filter(
                    (result): result is PromiseFulfilledResult<NewsArticle[]> =>
                        result.status === 'fulfilled'
                )
                .flatMap((result) => result.value)

            setData(combinedResults.sort(() => Math.random() - 0.5))

            const errors = results
                .filter(
                    (result): result is PromiseRejectedResult =>
                        result.status === 'rejected'
                )
                .map((result) => result.reason)

            if (errors.length > 0) {
                console.error('Some APIs failed:', errors)
            }
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [filters, searchQuery, newsChannels])

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
