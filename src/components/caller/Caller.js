import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CallIcon from '@mui/icons-material/Phone';
import { addCaller, deleteCaller, getCallers } from '../../api/caller.api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'


const Caller = () => {
  const [callers, setCallers] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [newCaller, setNewCaller] = useState({ name: '', description: '', phoneNumber: '' });

  const handleAddCaller = async () => {
    try {
        if (!isPossiblePhoneNumber(newCaller.phoneNumber)) {
            toast("Invalid Phone Number", { type: 'error' })
            return
        }
        const caller = await addCaller(newCaller)
        setCallers([...callers, caller]);
        setNewCaller({ name: '', description: '', phoneNumber: '' });
        toast("Caller Added", { type: 'success' })
        setOpenPopup(false);
    } catch (err) {
        console.log(err);
        toast(err.error, { type: 'error' })
        setOpenPopup(false);
    }
  };

  const handleDeleteCaller = async (id) => {
    try {
        await deleteCaller({ id })
        const updatedCallers = callers.filter((caller) => caller.id !== id);
        setCallers(updatedCallers);
        toast("Caller Deleted", { type: 'success' })
    } catch (err) {
        toast(err.error, { type: 'error' })
    }
  };

  const handleCall = async (phoneNumber) => {
    const response = await axios.post(`https://call-bot-server-21da804e0682.herokuapp.com/make-a-call`, {})
    toast(`Calling ${phoneNumber}`, { type: 'success' })
    console.log(`Calling ${phoneNumber}`);
  };

  useEffect(() => {
    async function fetchCallers() {
        const callerList = await getCallers()
        console.log(callerList);
        setCallers(callerList)
    }

    fetchCallers();
  }, [])

  return (
    <div>
      <Button style={{ marginBottom: '20px', cursor: 'pointer' }} variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
        Add Caller
      </Button>
      <TableContainer component={Paper}>
        <Table>
        <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              <TableCell colSpan={4} style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: '25px' }}>
                Callers
              </TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: '#e0e0e0' }}>
              <TableCell style={{ fontWeight: 'bolder' }}>Name</TableCell>
              <TableCell style={{ fontWeight: 'bolder' }}>Description</TableCell>
              <TableCell style={{ fontWeight: 'bolder' }}>Phone Number</TableCell>
              <TableCell style={{ fontWeight: 'bolder' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {callers.map((caller) => (
              <TableRow key={caller.id}>
                <TableCell>{caller.name}</TableCell>
                <TableCell>{caller.description}</TableCell>
                <TableCell>{caller.phoneNumber}</TableCell>
                <TableCell>
                  <Button style={{ cursor: 'pointer' }} onClick={() => handleCall(caller.phoneNumber)} color="primary">
                    <CallIcon />
                  </Button>
                  <IconButton style={{ cursor: 'pointer' }} onClick={() => handleDeleteCaller(caller.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle style={{ fontWeight: 'bolder' }}>Add Caller</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newCaller.name}
            onChange={(e) => setNewCaller({ ...newCaller, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newCaller.description}
            onChange={(e) => setNewCaller({ ...newCaller, description: e.target.value })}
            fullWidth
            margin="normal"
          />
            <PhoneInput
                placeholder="Enter phone number"
                value={newCaller.phoneNumber}
                onChange={(e) => setNewCaller({ ...newCaller, phoneNumber: e })}
            />
        </DialogContent>
        <DialogActions style={{ margin: '10px' }}>
          <Button variant="contained" onClick={() => setOpenPopup(false)} color="error">Cancel</Button>
          <Button variant="contained" onClick={handleAddCaller} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default Caller;
