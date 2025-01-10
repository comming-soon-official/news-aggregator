import { Newspaper } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { useFetchNews } from '@/hooks/useFetchNews'
import { formatDate, truncateString } from '@/utils'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { NewsArticleTypes } from './types'

const NewsFeed = () => {
    const { data, loading } = useFetchNews()

    if (loading) {
        return (
            <div className="w-full">
                <h2 className="text-2xl font-semibold">Your News Feed</h2>
                <Card className="w-full">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="my-4 border-b">
                            <CardHeader>
                                <div className="flex flex-col gap-2 lg:flex-row">
                                    <Skeleton className="object-cover w-full h-64 rounded-md lg:w-96" />
                                    <div className="w-full">
                                        <div className="mb-2">
                                            <Skeleton className="h-4 w-[100px] mb-2" />
                                            <Skeleton className="h-4 w-[150px]" />
                                        </div>
                                        <Skeleton className="w-full h-6 mb-2" />
                                        <Skeleton className="h-4 w-[90%] mb-2" />
                                        <Skeleton className="h-4 w-[80%]" />
                                    </div>
                                </div>
                            </CardHeader>
                        </div>
                    ))}
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold">Your News Feed</h2>
            {data.length > 0 ? (
                <Card className="w-full">
                    {data
                        .filter(
                            (article: NewsArticleTypes) =>
                                article.title !== '[Removed]'
                        )
                        .map((article: NewsArticleTypes, i) => {
                            return (
                                <div className="my-4 border-b" key={i}>
                                    <CardHeader className="">
                                        <div className="flex flex-col gap-2 lg:flex-row">
                                            {article.urlToImage && (
                                                <img
                                                    src={article.urlToImage}
                                                    alt={article.title}
                                                    className="object-cover w-full h-64 rounded-md lg:w-96"
                                                />
                                            )}
                                            <div>
                                                <div className="mb-2">
                                                    <p className="text-sm opacity-80">
                                                        {article.source.name}
                                                    </p>
                                                    <p className="text-sm opacity-80">
                                                        {article.author}
                                                    </p>
                                                </div>
                                                <h2 className="text-xl font-semibold">
                                                    {truncateString(
                                                        article.title,
                                                        200
                                                    )}
                                                </h2>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div>
                                            <div>
                                                <div>{article.description}</div>
                                            </div>
                                            <div></div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <div className="flex gap-4 text-sm">
                                            <Badge variant={'outline'}>
                                                {article.api_source}
                                            </Badge>
                                            <div className="opacity-80">
                                                {formatDate(
                                                    article.publishedAt
                                                )}
                                            </div>
                                        </div>
                                        <a href={article.url} target="_blank">
                                            <Button
                                                size={'sm'}
                                                variant={'secondary'}
                                                className="hover:underline"
                                                onClick={() => {}}
                                            >
                                                <Newspaper />
                                                Full Article
                                            </Button>
                                        </a>
                                    </CardFooter>
                                </div>
                            )
                        })}
                </Card>
            ) : (
                <Card className="w-full">
                    <CardHeader>
                        <div className="flex flex-col gap-2 lg:flex-row">
                            <div className="flex items-center justify-center w-full">
                                <h4 className="text-4xl">No Articles Found</h4>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            )}
        </div>
    )
}

export default NewsFeed
