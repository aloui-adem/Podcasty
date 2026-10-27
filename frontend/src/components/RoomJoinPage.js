import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
export default function RoomPage(){
    
    const navigate=useNavigate();
    const [roomCode,setCode]=useState();
    const [error,seterror]=useState();
    function handleTextField(e){
        setCode(e.target.value);
    }


    function roombuttonpressed(){
        const requestOptions={
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            code:roomCode
        })};
        fetch('/api/join-room', requestOptions)
            .then((response)=> 
                {if (response.ok)
                {
                    navigate(`/room/${roomCode}`);}
                else{
                    seterror("Room not found");}
                })
            .catch((error)=>console.log(error))
    }



    return(
        <Box
        sx={{
        textAlign:"center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "300px",
        px: 2,

      }}
        >
        <Grid container spacing={1}>
            <Grid item xs={12} >
                <Typography variant='h4' component="h4">
                    Join Room!
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <TextField placeholder="Enter a Room Code" 
                label="code" 
                error={error}
                value={roomCode}
                helperText={error}
                variant="outlined"
                onChange={handleTextField}/>
            </Grid>
            <Grid item xs={12} >
                <Button onClick={roombuttonpressed} color="secondary" variant="contained" >
                   Join Room 
                </Button>
             </Grid>
             <Grid item xs={12} >
                <Button color="primary" variant="contained" to="/" component={Link}>
                   Go Back 
                </Button>
             </Grid>

        </Grid>
        </Box>
    )
}