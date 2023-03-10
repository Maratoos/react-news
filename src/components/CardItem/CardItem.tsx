import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ICardItemProps } from "../../models";
import { unixTimeToNormalDate } from "../../helpers/unixTimeToNormalDate";


export const CardItem = ({title, score, author, date, id}: ICardItemProps) => {
  return (
    <Link to={`news/${id}`} style={{margin: "0 10px 20px 10px"}}>
      <Card sx={{ minWidth: 300, backgroundColor: "#293133",  }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="#4C514A" gutterBottom>
            {unixTimeToNormalDate(date)}
          </Typography>
          <Typography variant="h5" component="div" color="#DBD7D2">
            {title.slice(0, 15)}...
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ mb: 1.5 }} color="#7F7679">
              Author: {author}
            </Typography>
            <Typography sx={{ mb: 1.5, ml: "15px" }} color="#7F7679">
              Score: {score}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
