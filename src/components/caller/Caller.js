// Caller.jsx

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
import '../../styles/caller/Caller.scss'; // Add this line

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
    <div className="caller-container"> {/* Add className */}
      <Button className="add-caller-button" variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
        Add Caller
      </Button>
      <TableContainer component={Paper} className="caller-table"> {/* Add className */}
        <Table>
        <TableHead>
            <TableRow className="table-header"> {/* Add className */}
              <TableCell colSpan={4} className="table-header-cell"> {/* Add className */}
                Callers
              </TableCell>
            </TableRow>
            <TableRow className="table-row-header"> {/* Add className */}
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {callers.map((caller) => (
              <TableRow key={caller.id} className="table-row"> {/* Add className */}
                <TableCell>{caller.name}</TableCell>
                <TableCell>{caller.description}</TableCell>
                <TableCell>{caller.phoneNumber}</TableCell>
                <TableCell>
                  <Button className="call-button" onClick={() => handleCall(caller.phoneNumber)} color="primary">
                    <CallIcon />
                  </Button>
                  <IconButton className="delete-button" onClick={() => handleDeleteCaller(caller.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle className="dialog-title">Add Caller</DialogTitle> {/* Add className */}
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
