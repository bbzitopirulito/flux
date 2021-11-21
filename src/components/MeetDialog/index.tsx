import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface MeetDialogData {
  onClose: () => void;
  open: boolean;
  startSmallTalk: () => void;
}

export const MeetDialog = (props: MeetDialogData) => {
  const { onClose, startSmallTalk, open } = props;

  const handleStartSmallTalk = () => {
    onClose();
    startSmallTalk();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>You've met Helena!</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button>
          <ListItemAvatar>
            <Box display="flex" justifyContent="center">
              <EmojiPeopleIcon color="success" width="100%" />
            </Box>
          </ListItemAvatar>
          <ListItemText primary={"Wave"} />
        </ListItem>

        <ListItem button onClick={() => handleStartSmallTalk()}>
          <ListItemAvatar>
            <Box display="flex" justifyContent="center">
              <RecordVoiceOverIcon color="info" />
            </Box>
          </ListItemAvatar>
          <ListItemText primary="Start small talk" />
        </ListItem>
      </List>
    </Dialog>
  );
};
