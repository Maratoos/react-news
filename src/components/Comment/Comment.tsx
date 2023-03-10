import React, { useState } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { IComment, ICommentProps } from "../../models";
import { unixTimeToNormalDate } from "../../helpers/unixTimeToNormalDate";
import { getNestedComments } from "../../hooks/UseComments";

export const Comment = ({ author, date, text, kids }: ICommentProps) => {
  const [nestedComments, setNestedComments] = useState<IComment[]>([]);
  const { fetchNestedComments, isLoading, error } = getNestedComments();

  const handleGetNestedComments = async () => {
    if (kids && !nestedComments.length) {
      const nested = await fetchNestedComments(kids);
      setNestedComments(nested.sort((a, b) => b.time - a.time));
    }
  }

  return (
    <>
      <Box
        sx={{
          width: "90%",
          border: "2px solid #6F73EE",
          borderRadius: "10px",
          margin: "5px 0",
        }}
        onClick={handleGetNestedComments}
      >
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography color="#686C5E" variant="h6" component="p">
            Author: {author}
          </Typography>
          {kids && (
            <Typography color="#686C5E" variant="h6" component="p">
              Have some comments
            </Typography>
          )}
          <Typography color="#686C5E" variant="h6" component="p">
            Date: {unixTimeToNormalDate(date)}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "left", margin: "10px 0 0 20px" }}>
          <Typography sx={{wordWrap: "break-word"}} variant="h6" component="p">
            {text}
          </Typography>
        </Box>
      </Box>
      {nestedComments.length > 0 &&
        nestedComments.map((nested) => (
          <Box
            sx={{
              width: "90%",
              border: "2px solid #6F73EE",
              borderRadius: "10px",
              margin: "5px 0 5px 50px",
            }}
            key={Math.random()}
          >
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography color="#686C5E" variant="h6" component="p">
                Author: {nested.by}
              </Typography>
              <Typography color="#686C5E" variant="h6" component="p">
                Date: {unixTimeToNormalDate(nested.time)}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "left", margin: "10px 0 0 20px" }}>
              <Typography sx={{wordWrap: "break-word"}} variant="h6" component="p">
                {nested.text}
              </Typography>
            </Box>
          </Box>
        ))}
      {isLoading && (
        <Typography
          variant="h5"
          component="p"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          Loading comments...
        </Typography>
      )}
      {error && !isLoading && (
        <Typography
          variant="h5"
          component="p"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {error}
        </Typography>
      )}
    </>
  );
};
