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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';


import { addCaller, deleteCaller, getCallers, getCallerListPaginated } from '../../api/caller.api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'


const Caller = () => {
  async function fetchCallers(page) {
    const resp = await getCallerListPaginated(page)
    // console.log(callerList);

    setCallers(resp.callers)
    setTotal(resp.count)
  }


  const [callers, setCallers] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [newCaller, setNewCaller] = useState({ name: '', description: '', phoneNumber: '' });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);


  const pageChange = (event, page) => {
    setPage(page);
    console.log("page changed to ", page)
    fetchCallers(page);
  }



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

    fetchCallers(page);
  }, [])

  return (
    <div style={{ position: "relative" }}>
      {/* <Button style={{ marginBottom: '20px', cursor: 'pointer' }} variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
        Add Caller
      </Button>
      <IconButton onClick={() => setOpenPopup(true)}>
      <PersonAddIcon variant="contained" color="primary" fontSize='large' onClick={() => setOpenPopup(true)} >
        Add Caller
      </PersonAddIcon>
      </IconButton> */}
      <h1>
        Callers
      </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              {/* <TableCell colSpan={4} style={{ textAlign: 'left', fontWeight: 'bolder', fontSize: '25px' }}>
                Callers
              </TableCell> */}
            </TableRow>
            <TableRow style={{ backgroundColor: '#e0e0e0' }}>
              <TableCell style={{ fontWeight: 'bolder', fontSize: "18px" }}>Name</TableCell>
              <TableCell style={{ fontWeight: 'bolder', fontSize: "18px" }}>Description</TableCell>
              <TableCell style={{ fontWeight: 'bolder', fontSize: "18px" }}>Phone Number</TableCell>
              <TableCell style={{ fontWeight: 'bolder', fontSize: "18px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {callers.map((caller) => (
              <TableRow key={caller.id}>
                <TableCell style={{ fontSize: "16px" }} >{caller.name}</TableCell>
                <TableCell style={{ fontSize: "16px" }}>{caller.description}</TableCell>
                <TableCell style={{ fontSize: "16px" }}>{caller.phoneNumber}</TableCell>
                <TableCell >
                  <Stack direction="row" spacing={2} style={{ position: "relative", marginLeft: "30%" }} >
                    <Button style={{ cursor: 'pointer' }} onClick={() => handleCall(caller.phoneNumber)} color="primary">
                      <CallIcon />
                    </Button>
                    <IconButton style={{ cursor: 'pointer' }} color="primary" >
                      <EditIcon />
                    </IconButton>
                    <IconButton style={{ cursor: 'pointer' }} onClick={() => handleDeleteCaller(caller.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
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
      <IconButton onClick={() => setOpenPopup(true)} style={{ position: "absolute", right: 10 }} >
        {/* <PersonAddIcon variant="contained" color="primary" sx={{ fontSize: 60 }}  onClick={() => setOpenPopup(true)} >
        Add Caller
      </PersonAddIcon> */}

        <AddCircleRoundedIcon variant="outlined" color="primary" sx={{ fontSize: 80 }} onClick={() => setOpenPopup(true)} >
          Add Caller
        </AddCircleRoundedIcon>
      </IconButton>

      <div style={{display: "flex", justifyContent: "center", position: "relative", bottom: 0, width: "100%" }}>
        <Stack spacing={2}>
          <Pagination count={total} shape="rounded" onChange={(e, page) => pageChange(e, page)} />
        
        </Stack>
      </div>

      </div>
);
}


export default Caller;
