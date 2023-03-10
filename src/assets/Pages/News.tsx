import React from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import { getNewsById } from "../hooks/GetNewsById";
import { unixTimeToNormalDate } from "../helpers/unixTimeToNormalDate";
import { Comment } from "../components/Comment/Comment";
import { getCommentsById } from "../hooks/UseComments";
import { getCommentsCount } from "../hooks/GetCommentsCount";

export const News = () => {
  const location = useLocation()
  const postId = +location.pathname.replace(/\D/g, "")
  const { news, isLoading, errorMessage } = getNewsById(postId)
  const {comments,commentsError,commentsIsLoading,handleRefresh,disabled,} = getCommentsById(postId)
  const { commentCount } = getCommentsCount(postId)

  console.log(news?.url)

  return (
    <Box sx={{marginBottom: "50px"}} >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <Button variant="contained" sx={{ margin: "20px 0 0 20px" }}>
            News page
          </Button>
        </Link>
        <Button
          onClick={() => handleRefresh()}
          disabled={disabled}
          variant="contained"
          sx={{ margin: "20px 120px 0 0" }}
        >
          Refresh Comments
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          padding: "0 20px",
        }}
      >
        {typeof news !== "undefined" && (
          <>
            <Box sx={{ width: "40%", height: "100vh" }}>
              <Typography variant="h4" component="h1">
                {news.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Typography variant="h5" component="p">
                  Author: {news.by}
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{ marginTop: "10px" }}
                >
                  Date: {unixTimeToNormalDate(news.time)}
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{ marginTop: "10px" }}
                >
                  Comments: {commentCount}
                </Typography>
              </Box>

              <Button
                disabled={typeof news?.url == "undefined" ? true : false}
                variant="contained"
                component="a"
                href={`${news.url}`}
                sx={{ marginTop: "20px" }}
              >
                Go to source
              </Button>
            </Box>

            <Box
              sx={{
                width: "60%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {Array.isArray(comments) &&
                comments.length > 0 &&
                !commentsError &&
                !commentsIsLoading &&
                comments.map((comment) => (
                  <Comment
                    author={comment.by}
                    date={comment.time}
                    text={comment.text}
                    kids={comment.kids}
                    key={comment.id}
                  />
                ))}
              {commentsError && !commentsIsLoading && (
                <Typography
                  variant="h4"
                  component="p"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {commentsError}
                </Typography>
              )}
              {!comments.length && !commentsIsLoading && (
                <Typography
                  variant="h4"
                  component="p"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  No comments
                </Typography>
              )}
              {commentsIsLoading && (
                <Typography
                  variant="h4"
                  component="p"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Loading comments...
                </Typography>
              )}
            </Box>
          </>
        )}
        {errorMessage && !isLoading && typeof news === "undefined" && (
          <Typography
            variant="h4"
            component="p"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {errorMessage}
          </Typography>
        )}
        {isLoading && (
          <Typography
            variant="h4"
            component="p"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            Loading news...
          </Typography>
        )}
      </Box>
    </Box>
  );
};
