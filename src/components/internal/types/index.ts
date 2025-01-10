export type SourceTypes = {
    id: string
    name: string
}

export type NewsAPITypes = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: SourceTypes
    title: string
    url: string
    urlToImage: string
}

export type NewsArticleTypes = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: SourceTypes
    title: string
    url: string
    urlToImage: string
    api_source: string
}

export type NYTimesTypes = {
    title: string
    abstract: string
    byline: string
    created_date: string
    url: string
    multimedia?: Array<{
        url: string
        format: string
        height: number
        width: number
        type: string
    }>
}

export type NYTimesSortOptions = 'relevance' | 'newest' | 'oldest'

export type GuardianAPITypes = {
    apiUrl: string
    id: string
    isHosted: boolean
    pillarId: string
    pillarName: string
    sectionId: string
    sectionName: string
    type: string
    webPublicationDate: string
    webTitle: string
    webUrl: string
}
