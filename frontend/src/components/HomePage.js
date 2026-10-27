import React, { useState, useEffect} from "react";
import RoomPage from "./RoomJoinPage"
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  Grid,
  Button,
  Typography,
  ButtonGroup,
  TextField,
  Box,
} from "@mui/material";
import {
    BrowserRouter as Router, 
    Link, 
    Route, 
    Routes, 
    Navigate,
    useNavigate,
} from "react-router-dom"
export default function HomePage(){
// Router gets the path from the user url 
//Routes is like a switch statement 
//Route are the cases of the switch statement
///:roomCode means we r passing a variable there

    const [room_code, setCode]=useState(null);

    async function ComponentMounted(){
        const response = await fetch("/api/userinroom");
        const data = await response.json();
        setCode(data.code);
        
    }
    useEffect(() => { ComponentMounted(); }, [])

    function HomePage(){
        return(
        <Box
        sx={{
        textAlign:"center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "200px",
        px: 2,
      }}
        >
            <Grid container spacing ={3}>
                <Grid item xd={12}>
                    <Typography variant="h3" compact="h3" textAlign="center">
                        Podcasty
                    </Typography>
                </Grid>
                <Grid item xd={12}>
                    <ButtonGroup disableElevation variant="contained" color="secondary">
                        <Button color="secondary" to="/join" component={Link}>
                            Join Room
                        </Button>
                        <Button color="primary" to="/create" component={Link}>
                            Create Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Box>

        )
    }

    function clearRoomCode(){
        setCode(null);
    }//clears the room code so when we leave the homepage sets the old code to null

    return(
        <Router>
            <Routes>
                <Route path='/' 
                element={room_code ? <Navigate to={`/room/${room_code}`} /> : <HomePage />} />
                <Route path='/join' element={<RoomPage />}/>
                <Route path='/create' element={<CreateRoomPage />}/>
                <Route
                    path="/room/:room_code"
                    element={<Room leaveRoomCallback={clearRoomCode} />}
                />
            </Routes>
        </Router>
    )
}