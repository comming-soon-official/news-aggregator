export type SourceTypes = {
    id: string
    name: string
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
}
