import React , {Component, useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";

export default function Room({ leaveRoomCallback }){

    const navigate= useNavigate();
    const [votesToSkip, setVotes]=useState(2);
    const [guestCanPause, setguestCanPause]=useState(true);
    const [isHost, setHost]=useState(false);
    const {room_code} = useParams();

    async function getRoomInfo(){
        //gets the data from the backend through the url : turns it into json and sets the room details
        //if the response is not ok or invalid it navigates back to homepage withouth setting antyhing by using return
        try{
        const response = await fetch('/api/get-room'+ '?code=' + room_code);
        if(!response.ok){
            leaveRoomCallback();
            navigate('/');
            return;}
        const data = await response.json();
        setVotes(data.votes_to_skip);
        setguestCanPause(data.guest_can_pause)
        setHost(data.isHost);
        }catch (error) {
            console.error("Error fetching room info:", error);}
    }

    async function leave_room(){
        const requestOptions={
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        }
        try{
            const response = await fetch("/api/leave-room", requestOptions);//clears the room code from the room in the backend
            if (response.ok) {
                leaveRoomCallback();//clears the room code from the homepage(parent)
                navigate('/');}
            else{
                console.log("Server failed to process leave request:", response.status);}
                //this is added so if the response is not ok the backend and the frontend knows
                //if the response failed ; the backend thinks the user is still in the room
                //however the front will navigate back to the homepage
                // UNTIL BAED DSET
            }
        catch(error){
            console.error("Network error while leaving room:", error);
            // this is added cuz fetch throws a lot of errors if the user s network goes down while the request is still going
        }
    }
    
    useEffect(() => {
        getRoomInfo();
        }, [room_code]);

    return(
        <Box>
            <Grid container spacing ={3}
            sx={{
            textAlign:"center",
            position:'fixed',
            top: "12%",
            left: "8%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "250px",
            px: 2,
      }}
            >
                <Grid item xs={12}>
                    <Typography variant='h6' component='h6'>
                        Room Code :{room_code}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h8' component='h8'>
                        Guest Can Pause : {String(guestCanPause)=="true"? 'Yes':'NO'}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h8' component='h8'>
                        Votes to skip the current song : {String(votesToSkip)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h8' component='h8'>
                       {String(isHost)=='true'? 'You are The Room Host':'You are Not The Room Host'}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}
                sx={{
            textAlign:"center",
            position:'fixed',
            top: "9%",
            left: "81%",
            transform: "translate(-37%, -140%)",
            width: "100%",
            }}
                >
                    <Button color='primary' variant='contained' onClick={leave_room}  >
                        leave the room
                    </Button>
                </Grid>
        </Box>

        
    )
}
