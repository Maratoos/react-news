import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { INews } from '../../models';

export const getNewsById = (id: number) => {
  const [news, setNews] = useState<INews>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const memoizedId = useMemo(() => id, [id])

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true)

      try {
        const { data } = await axios(`https://hacker-news.firebaseio.com/v0/item/${memoizedId}.json`,)

        setNews(data);
      } catch (e: any) {
        // извиняюсь за использование any
        setErrorMessage("An error occurred while receiving the news, please try again")
        setIsLoading(false)
        console.log(e.message)
      }

      setIsLoading(false)
    }

    fetchNews()
  }, [memoizedId])

  return { news, isLoading, errorMessage }
}


