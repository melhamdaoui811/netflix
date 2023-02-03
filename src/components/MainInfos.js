import React,{useEffect, useState} from 'react'
import {Box, Paper, Rating, Typography} from "@mui/material"
import MovieCover from './MovieCover';
import StarIcon from "@mui/icons-material/Star";

import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useUpdateDoc } from '../hooks/useUpdateDoc';
import { useUserContext } from '../context/userContext';

function MainInfos({id,poster,title,overview,rating}) {
  const {updateDocByID,pending,done}=useUpdateDoc();
  const { DOC } = useUserContext();
  const [color,setColor]=useState("");
  const toggleFav=()=>{
    const data =[...DOC.likes];
    const index=data.indexOf(id);

      if(color==="error" && index!==-1){
          setColor("");
          data.splice(index,1);
          console.log(index,data);
         updateDocByID(DOC.id, "likes",data );
      }else if(color===""){
        setColor("error")
        data.push(id);
        updateDocByID(DOC.id, "likes", data);
      }
  }
  useEffect(()=>{
      if(DOC.likes.indexOf(id)!==-1){
          setColor("error");
      }
  },[id,DOC])
  return (
    <Paper
      sx={{
        mt: { xs: 5, lg: 0 },
        mr: { xs: 0, sm: 1 },
        width: { xs: "100%", md: "50%" },
        p: 1,
        borderRadius: "20px",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: { xs: "column", md: "row" },
      }}>
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          overflow: "hidden",
          borderRadius: "40px",
          p: 1,
        }}>
        <MovieCover image={poster} title={title} />
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "60%", lg: "60%" },
          p: 1,
          alignSelf: "center",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant='h4' sx={{ mb: 1 }}>
            {title}
          </Typography>
          <IconButton
            onClick={toggleFav}
            sx={{ width: "50px", height: "50px", mb: 2 }}>
            <FavoriteIcon fontSize='large' color={color} />
          </IconButton>
        </Box>

        <Typography variant='p'>{overview}</Typography>
        <Box sx={{ mt: 3 }}>
          <Typography>Rating :</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {rating && (
            <Rating
              name='movie-feedback'
              max={10}
              value={rating}
              readOnly
              precision={0.1}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
              }
            />
          )}
          {rating && <Box sx={{ ml: 2 }}>{rating}</Box>}
        </Box>
      </Box>
    </Paper>
  );
}

export default MainInfos