import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IComment } from "../models";

export const getCommentsById = (postId: number) => {
  const [commentsIsLoading, setCommentsIsLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [commentsError, setCommentsError] = useState<string>("")
  const [comments, setComments] = useState<IComment[]>([])

  const fetchComments = useCallback(async () => {
    setCommentsIsLoading(true)
    setDisabled(true)
    try {
      const { data } = await axios(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`)
      const commentIds = data.kids || []
      const comments: IComment[] = []

      for (let i = 0; i < commentIds.length; i++) {
        const { data } = await axios(`https://hacker-news.firebaseio.com/v0/item/${commentIds[i]}.json?print=pretty`)
        comments.push(data)
      }

      setComments(comments.sort((a, b) => b.time - a.time))
      setCommentsIsLoading(false)
      setDisabled(false)
    } catch (e: any) {
      // извиняюсь за использование any
      setCommentsError("Failed to fetch comments, please try again")
      setCommentsIsLoading(false)
      setDisabled(false)
      console.log(e.message)
    }
  }, [postId])

  const handleRefresh = async () => {
    await fetchComments()
  }

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return { comments, commentsError, commentsIsLoading, handleRefresh, disabled }
}

export const getNestedComments = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const fetchNestedComments = async (commentIds: number[]): Promise<IComment[]> => {
    const comments: IComment[] = []
    try {
      setIsLoading(true)
      for (let i = 0; i < commentIds.length; i++) {
        const commentId = commentIds[i]
        const { data } = await axios(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
        comments.push(data)
        if (data.kids) {
          const nestedComments = await fetchNestedComments(data.kids)
          comments.push(...nestedComments)
        }
      }
      setIsLoading(false)
    } catch (e: any) {
      // извиняюсь за исполльзование any
      setError("An error occurred while receiving the comments, please try again")
      setIsLoading(false)
      console.log(e.message)
    }
    return comments
  }

  return { fetchNestedComments, isLoading, error }
}
