import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useMovies } from '../../hooks/useMovies'

function Favorite() {
  const {data} = useMovies("getFav");
  useEffect(()=>{
    console.log(data);
  },[data])
  return (
      <Box
      component='main'
      sx={{
        flexGrow: 1,
        justifyContent:"center",
        alignItems:"center",
        position:"relative",
        ml:2,
        p: 3,
        mt:8,
        width:"100%" ,
      }}>Favorite</Box>
  )
}

export default Favorite