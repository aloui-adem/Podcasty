import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Box,
} from "@mui/material";
import { Link, useBlocker } from "react-router-dom";
//Grid aligns elements vertically or horizontally(a flexbox in css)

export default function CreateRoomPage() {

  const navigate=useNavigate();
  const[guestCanPause, setCanPause]=useState(true);
  const [defaultVotes, setVotes]= useState(2);
  function handleVotesChange(e){
    setVotes(e.target.value);
  }
  function handleGuestCanPausechange(e){
    setCanPause(e.target.value=== "true" ? true:false)
  }

  function handleButtonPressed(){
    const requestOptions={
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            votes_to_skip :defaultVotes,
            guest_can_pause: guestCanPause,
        })
    };//this is used to turn our GET request in fetch to a POST
    fetch('/api/create-room', requestOptions)
    //POST request created the room with the host id as the request session
    //and otherr data from here
        .then((response)=>response.json())
        .then((data)=> navigate(`/room/${data.code}`));



  }
  return (
    <Box
        sx={{
        textAlign:"center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "450px",
        px: 2,
      }}
    >
      <Grid container spacing={2} direction="column" >
        {/* Title */}
        <Grid item xs={12}>
          <Typography component="h5" variant="h5">
            Create Room
          </Typography>
        </Grid>

        {/* Guest Control Options */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ textAlign: "center", mb: 1 }}>
              Guest Control Pannel
            </FormLabel>
            <RadioGroup row defaultValue="true" onChange={handleGuestCanPausechange}>
              <FormControlLabel
                value={true}
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="secondary" />}
                label="No control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Votes Input with Bottom Line Only */}
        <Grid item xs={12}>
          <FormControl>
            <TextField
              onChange={handleVotesChange}
              required
              type="number"
              variant="standard" // Shows only the bottom line
              defaultValue={defaultVotes}
              sx={{
                "& input": {
                  textAlign: "center", // Centers the number inside the input line
                },
              }}
              slotProps={{
                htmlInput: { min: 1 },
              }}
            />
            <FormHelperText sx={{ textAlign: "center" }}>
              Votes required to skip a song
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" onClick={handleButtonPressed}>
            Create A Room
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button color="primary" variant="contained" to="/" component={Link}>
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}