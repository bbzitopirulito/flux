import { Alert as MuiAlert, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import background from "../assets/background.png";
import character from "../assets/character.png";
import character2 from "../assets/character2.png";
import { SimpleDialog } from "../components/SimpleDialog";
import { drawScenario, isNearCharacter2 } from "../utils";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Box } from "@mui/system";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home: React.FC = () => {
  const [isInteractionDialogOpen, setIsInteractionDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [isSmallTalkOpen, setIsSmallTalkOpen] = useState<boolean>(false);
  const backgroundId = "background";
  const characterId = "character";
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
        characterHeight
      );

      if (isNearCharacter2(e, canvasWidth)) {
        setTimeout(() => setIsInteractionDialogOpen(true), 200);
        return;
      }
      setIsSmallTalkOpen(false);
    });

    if (!ctx) return;
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
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

  const handleClose = () => {
    setIsInteractionDialogOpen(false);
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
      <SimpleDialog
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
        open={isInteractionDialogOpen}
        onClose={handleClose}
        startSmallTalk={() => setIsSmallTalkOpen(true)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSmallTalkOpen}
        // autoHideDuration={6000}
        onClose={handleClose}
        // message="Note archived"
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
