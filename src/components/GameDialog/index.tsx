import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface MeetDialogData {
  onClose: () => void;
  open: boolean;
  startGame: () => void;
}

export const GameDialog = (props: MeetDialogData) => {
  const { onClose, startGame, open } = props;

  const handleStartSmallTalk = () => {
    onClose();
    startGame();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>You are in the game room!</Typography>
          <Typography>Let's ease off a bit.</Typography>
        </Box>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button onClick={() => handleStartSmallTalk()}>
          <ListItemAvatar>
            <Box display="flex" justifyContent="center">
              <SportsEsportsIcon color="info" />
            </Box>
          </ListItemAvatar>
          <ListItemText primary="Play Snake Game" />
        </ListItem>
      </List>
    </Dialog>
  );
};
