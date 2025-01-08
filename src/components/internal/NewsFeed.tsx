import { Newspaper } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useFetchNews } from '@/hooks/useFetchNews'
import { formatDate, truncateString } from '@/utils'

import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { NewsArticleTypes } from './types'

const NewsFeed = () => {
    const [articleData, setArticleData] = useState([])
    const { data } = useFetchNews()
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await fetch(
                'https://newsapi.org/v2/top-headlines?country=us&apiKey=87d4f68cf07b4abd82306e2726af365a'
            )
            const data = await response.json()

            setArticleData(data?.articles)
        }
        fetchAPI()
    }, [])
    console.log(data)

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold">Urgent News Feed</h2>
            <Card className="w-full">
                {articleData
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
                                                className="object-contain w-full rounded-md lg:w-1/2"
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
                                    <div className="text-sm opacity-60">
                                        {formatDate(article.publishedAt)}
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
        </div>
    )
}

export default NewsFeed
