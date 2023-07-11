import { useState, useEffect, ErrorInfo } from "react";
import axios from "axios";
import { IComment } from "../models";

type FunctionReturnedType = {
  commentCount: number;
};

export const getCommentsCount = (postId: number): FunctionReturnedType => {
  const [commentCount, setCommentCount] = useState<number>(0);

  const fetchComments = async (post: IComment): Promise<number> => {
    let count = post.kids?.length || 0;

    if (post.kids?.length) {
      for (let kidId of post.kids) {
        try {
          const { data } = await axios<IComment>(
            `https://hacker-news.firebaseio.com/v0/item/${kidId}.json`
          );
          const kid = data;
          count += kid.kids ? await fetchComments(kid) : 0;
        } catch (e: any) {
          // извиняюсь за использование any
          console.log(e.message);
        }
      }
    }
    return count;
  };

  const getCommentCount = async (): Promise<void> => {
    try {
      const { data } = await axios<IComment>(
        `https://hacker-news.firebaseio.com/v0/item/${postId}.json`
      );
      const post = data;
      const count = await fetchComments(post);
      setCommentCount(count);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getCommentCount();
  }, [postId]);

  return { commentCount };
};
