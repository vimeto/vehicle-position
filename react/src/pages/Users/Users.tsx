import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Snackbar, TextField } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { User } from '@src/entities/user/types';
import { Api } from '@entities/api';

interface ApiKey {
  name: string;
  token: string;
}

interface ApiKeyData {
  api_keys: ApiKey[];
}

const api = new Api();

const DialogBox: React.FC<{ open: boolean, text: string, handleClose: () => void }> = ({ open, text, handleClose }) => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const onCopy = () => {
    setSnackBarOpen(true);
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            {"API-key"}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
            <IconButton onClick={() => onCopy()} color="primary" component="button">
              <ContentCopyIcon />
            </IconButton>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackBarOpen}
          onClose={() => setSnackBarOpen(false)}
          autoHideDuration={2000}
          message="Copied to clipboard"
        />
      </>
  )
}

const FormDialogBox: React.FC<{ open: boolean, handleClose: () => void, handleSubmit: (a: string) => void }> = ({ open, handleClose, handleSubmit }) => {
  const [formValue, setFormValue] = useState('');

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Create new API-key
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Api key name (e.g. your computer name)
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="Api key name"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
          <Button onClick={() => handleSubmit(formValue)}>Submit</Button>
        </DialogActions>
      </Dialog>
  )
}

const Users: React.FC<{ currentUser: User }> = ({ currentUser }) => {
  const [loading, setLoading] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState('');

  console.log(apiKeys);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const handleFormDialogOpen = () => {
    setFormDialogOpen(true);
  }

  const handleSubmit = async (a: string) => {
    const res = await api.post<ApiKeyData>('/api_keys/', { name: a });
    setApiKeys(res.data.api_keys);
    setFormDialogOpen(false);
  }

  const handleFormDialogClose = () => {
    setFormDialogOpen(false);
  }

  useEffect(() => {
    api.get<ApiKeyData>('/api_keys/', setLoading).then((res) => setApiKeys(res.data.api_keys))
  }, [])

  return (
    <Box>
      {!loading && apiKeys.length > 0 && (
        apiKeys.map((key, index) => (
          <Box key={index} sx={{
            boxShadow: 2,
            margin: 1,
            padding: 1.5,
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
            }}>
              <Box>{key.name}</Box>
              <Button variant='contained' onClick={() => {setDialogText(key.token); handleDialogOpen();}}>Show</Button>
          </Box>
        ))
      )}
      <DialogBox open={dialogOpen} text={dialogText} handleClose={handleDialogClose} />
      <FormDialogBox open={formDialogOpen} handleClose={handleFormDialogClose} handleSubmit={handleSubmit} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={() => handleFormDialogOpen()} color="primary" component="button">
          <AddCircleOutlineIcon sx={{ width: 50, height: 50 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Users;
