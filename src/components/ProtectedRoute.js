import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('authToken');

    if (!token) {
      // If token does not exist, show alert dialog
      setUser(true);
    }
  }, []);

  const handleClose = () => {
    setUser(false);
    navigate('/login');
  };

  return (
    <>
      <Dialog open={user} onClose={handleClose} sx={{bgcolor: '#df6b0c'}}>
        <DialogContent>
          <DialogContentText>
            Please LogIn first to access this page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
};

export default ProtectedRoute;
