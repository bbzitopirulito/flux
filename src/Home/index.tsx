import {
  Alert as MuiAlert,
  Button,
  Dialog,
  DialogTitle,
  Fab,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import background from "../assets/background.png";
import character from "../assets/character.png";
import character2 from "../assets/character2.png";
import controller from "../assets/controller.png";
import { MeetDialog } from "../components/MeetDialog";
import { drawScenario, isNearCharacter2, isNearController } from "../utils";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { GameDialog } from "../components/GameDialog";
import Snake from "snake-game-react";
import { createStyles, makeStyles } from "@mui/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: "200px",
      bottom: "200px",
    },
  })
);

const Home: React.FC = () => {
  const [isInteractionDialogOpen, setIsInteractionDialogOpen] = useState(false);
  const [isSmallTalkOpen, setIsSmallTalkOpen] = useState<boolean>(false);
  const [isSnakeGameOpen, setIsSnakeGameOpen] = useState<boolean>(false);
  const [isGameDialogOpen, setIsGameDialogOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpenNewEventDialog, setIsOpenNewEventDialog] =
    useState<boolean>(false);
  const open = Boolean(anchorEl);

  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const backgroundId = "background";
  const characterId = "character";
  const controllerId = "controller";
  const character2Id = "character2";
  const canvasId = "canvas";

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  const characterWidth = 60;
  const characterHeight = 40;

  const character2Width = 45;
  const character2Height = characterHeight;

  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const background = document.getElementById(
      backgroundId
    ) as HTMLImageElement;

    const character = document.getElementById(characterId) as HTMLImageElement;

    const character2 = document.getElementById(
      character2Id
    ) as HTMLImageElement;

    const controller = document.getElementById(
      controllerId
    ) as HTMLImageElement;

    canvas.addEventListener("mousedown", (e) => {
      if (!ctx) return;
      drawScenario(
        ctx,
        background,
        canvasWidth,
        canvasHeight,
        character2,
        character2Width,
        character2Height,
        character,
        e,
        characterWidth,
        characterHeight,
        controller
      );

      if (isNearCharacter2(e, canvasWidth)) {
        setTimeout(() => setIsInteractionDialogOpen(true), 200);
        return;
      }
      if (isNearController(e, canvasWidth, canvasHeight)) {
        setTimeout(() => setIsGameDialogOpen(true), 200);
      }
      setIsSmallTalkOpen(false);
    });

    if (!ctx) return;
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(
        controller,
        canvasWidth - 265,
        canvasHeight - 370,
        character2Width,
        character2Height
      );
      ctx.drawImage(
        character,
        canvasWidth / 2.13,
        canvasHeight - 60,
        characterWidth,
        characterHeight
      );
      ctx.drawImage(
        character2,
        canvasWidth / 3.5,
        40,
        character2Width,
        character2Height
      );
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMeetDialogClose = () => {
    setIsInteractionDialogOpen(false);
  };

  const handleGameDialogClose = () => {
    setIsGameDialogOpen(false);
  };

  return (
    <>
      <canvas id={canvasId} width={canvasWidth} height={canvasHeight} />
      <img
        id={characterId}
        src={character}
        style={{ visibility: "hidden" }}
        alt="character"
      />
      <img
        id={character2Id}
        src={character2}
        style={{ visibility: "hidden" }}
        alt="character 2"
      />
      <img
        id={backgroundId}
        style={{ visibility: "hidden" }}
        height={500}
        width={canvasWidth}
        src={background}
      />
      <img
        id={controllerId}
        style={{ visibility: "hidden" }}
        height={500}
        width={canvasWidth}
        src={controller}
      />
      <MeetDialog
        open={isInteractionDialogOpen}
        onClose={handleMeetDialogClose}
        startSmallTalk={() => setIsSmallTalkOpen(true)}
      />
      <GameDialog
        open={isGameDialogOpen}
        onClose={handleGameDialogClose}
        startGame={() => setIsSnakeGameOpen(true)}
      />
      <Dialog open={isSnakeGameOpen} onClose={() => setIsSnakeGameOpen(false)}>
        <div>
          <Snake color1="#248ec2" color2="#1d355e" backgroundColor="#ebebeb" />
        </div>
      </Dialog>
      <Box
        onClick={handleClick}
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        position="absolute"
        bottom={30}
        left={30}
        style={{ zIndex: 1000 }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        className={classes.root}
        style={{ bottom: "200px", marginBottom: 200 }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => setIsOpenNewEventDialog(true)}>
          Create Event
        </MenuItem>
        <MenuItem onClick={handleClose}>New Meeting</MenuItem>
      </Menu>
      <Dialog
        open={isOpenNewEventDialog}
        onClose={() => setIsOpenNewEventDialog(false)}
      >
        <DialogTitle>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography>Create New Event</Typography>
          </Box>
        </DialogTitle>
        <Box p={3}>
          <div>
            <TextField
              label="Event Name"
              value={"New Event"}
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Date
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={"text"}
                // value={"12/12/2021 at 5pm"}
                value={new Date().toDateString()}
                // onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      // onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {/* {values.showPassword ? <VisibilityOff /> : <Visibility />} */}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              // 494d7e
              style={{ backgroundColor: "#494d7e" }}
              // color="success"
            >
              Create
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSmallTalkOpen}
        onClose={handleMeetDialogClose}
      >
        <Alert
          icon={
            <Box display="flex" alignItems="center">
              <VolumeUpIcon />
            </Box>
          }
          severity="info"
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography>Talking with Helena</Typography>
            <Box ml={2}>
              <img src={character2} width={30} alt="" />
            </Box>
          </Box>
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
