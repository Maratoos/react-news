import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { CardItem } from "../components/CardItem/CardItem"
import { getNews } from "../hooks/GetNews"

export const Home = () => {
  const { news, isLoading, errorMessage, disabled, handleRefreshNews } = getNews()

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          disabled={disabled}
          onClick={() => handleRefreshNews()}
        >
          Refresh news
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          mb: "30px",
          mt: "50px",
        }}
      >
        {Array.isArray(news) &&
          news.length > 0 &&
          !errorMessage &&
          !isLoading &&
          news.map((item) => (
            <CardItem
              title={item.title}
              score={item.score}
              author={item.by}
              date={item.time}
              key={item.id}
              id={item.id}
            />
          ))}
        {errorMessage && !isLoading && (
          <Typography
            variant="h3"
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
            variant="h3"
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
  )
}
