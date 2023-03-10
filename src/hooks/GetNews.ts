import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { INews } from "../models";

export const getNews = () => {
  const [news, setNews] = useState<INews[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const fetchNews = useCallback(async () => {
    setIsLoading(true)
    setDisabled(true)
    try {
      const { data } = await axios<number[]>("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
      const ids = data.slice(0, 100)

      const newsResponse = await Promise.all(
        ids.map(async (id) => {
          const { data } = await axios<INews>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
          return data
        })
      )

      setNews(newsResponse.sort((a, b) => b.time - a.time))
      setIsLoading(false)
      setDisabled(false)
    } catch (e: any) {
      // Извиняюсь за использование any
      setErrorMessage("An error occurred while receiving the news, please try again")
      setIsLoading(false)
      setDisabled(false)
    }
  }, [])

  useEffect(() => {
    fetchNews()
    if(!errorMessage) {
      const interval = setInterval(fetchNews, 60000)
      return () => clearInterval(interval)      
    }
  }, [fetchNews])

  const handleRefreshNews = useCallback(async () => {
    await fetchNews()
  }, [fetchNews])

  return { news, isLoading, errorMessage, disabled, handleRefreshNews }
}
