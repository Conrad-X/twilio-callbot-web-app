// import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CallIcon from "@mui/icons-material/Phone";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import "./callerStyleSheet.css";

import {
  addCaller,
  deleteCaller,
  getCallers,
  getCallerListPaginated,
  updateCaller,
} from "../../api/caller.api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import CallerTableHeader from "./CallerTableHeader";
import * as constants from "./callerTableConstants";

const Caller = () => {
  async function fetchCallers(page) {
    const resp = await getCallerListPaginated(page);

    setCallers(resp.callers);
    setTotal(resp.count);
  }

  const [callers, setCallers] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [newCaller, setNewCaller] = useState({
    name: "",
    description: "",
    phoneNumber: "",
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [valueToOrderBy, setValueToOrderBy] = useState(constants.CALLER_NAME);
  const [orderDirection, setOrderDirection] = useState(constants.ASC_ORDER);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [editCaller, setEditCaller] = useState({
    name: "",
    description: "",
    phoneNumber: "",
  });

  const pageChange = (event, page) => {
    setPage(page);

    fetchCallers(page);
  };

  const handleAddCaller = async () => {
    try {
      if (!isPossiblePhoneNumber(newCaller.phoneNumber)) {
        toast("Invalid Phone Number", { type: "error" });
        return;
      }
      const caller = await addCaller(newCaller);
      setCallers([...callers, caller]);
      setNewCaller({ name: "", description: "", phoneNumber: "" });
      toast("Caller Added", { type: "success" });
      setOpenPopup(false);
    } catch (err) {
      toast(err.error, { type: "error" });
      setOpenPopup(false);
    }
  };

  const handleEditPopup = async (updatedCaller) => {
    setEditCaller(updatedCaller);
    setOpenEditPopup(true);
  };
  const handleEditCaller = async () => {
    try {
      if (!isPossiblePhoneNumber(editCaller.phoneNumber)) {
        toast("Invalid Phone Number", { type: "error" });
        return;
      }
      setOpenEditPopup(false);
      const caller = await updateCaller(editCaller);

      fetchCallers(page);
      setEditCaller({ name: "", description: "", phoneNumber: "" });
      toast("Caller Updated", { type: "success" });
    } catch (err) {
      toast(err.error, { type: "error" });
      setOpenEditPopup(false);
    }
  };

  const handleDeleteCaller = async (id) => {
    try {
      await deleteCaller({ id });
      const updatedCallers = callers.filter((caller) => caller.id !== id);
      setCallers(updatedCallers);
      toast("Caller Deleted", { type: "success" });
    } catch (err) {
      toast(err.error, { type: "error" });
    }
  };

  const handleCall = async (phoneNumber) => {
    const response = await axios.post(
      `https://call-bot-server-21da804e0682.herokuapp.com/make-a-call`,
      {}
    );
    toast(`Calling ${phoneNumber}`, { type: "success" });
  };

  useEffect(() => {
    fetchCallers(page);
  }, []);

  const headers = [
    {
      id: constants.CALLER_NAME,
      numeric: false,
      label: "Name",
    },
    {
      id: constants.CALLER_DESCRIPTION,
      numeric: false,
      label: "Description",
    },
    {
      id: constants.CALLER_PHONE_NUMBER,
      numeric: false,
      label: "Phone Number",
    },
    {
      id: "actions",
      numeric: false,
      label: "Actions",
    },
  ];

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === constants.ASC_ORDER;
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? constants.DESC_ORDER : constants.ASC_ORDER);
  };

  const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
    stabilizedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedRowArray.map((el) => el[0]);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, valueToOrderBy) {
    return order === constants.DESC_ORDER
      ? (a, b) => descendingComparator(a, b, valueToOrderBy)
      : (a, b) => -descendingComparator(a, b, valueToOrderBy);
  }



  return (
    <div id="main-div" >
      <div id="table-div">
        <h1>Callers</h1>
        <TableContainer component={Paper}>
          <Table>
            <CallerTableHeader
              valueToOrderBy={valueToOrderBy}
              orderDirection={orderDirection}
              handleRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortedRowInformation(
                callers,
                getComparator(orderDirection, valueToOrderBy)
              ).map((caller) => (
                <TableRow key={caller.id}>
                  <TableCell className="table-row" >
                    {caller.name}
                  </TableCell>
                  <TableCell className="table-row" >
                    {caller.description}
                  </TableCell>
                  <TableCell className="table-row" >
                    {caller.phoneNumber}
                  </TableCell>
                  <TableCell>
                    <Stack
                      id="button-stack"
                      direction="row"
                      spacing={2}
                      
                    >
                      <Button
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCall(caller.phoneNumber)}
                        color="primary"
                      >
                        <CallIcon />
                      </Button>
                      <IconButton
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleEditPopup(caller);
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteCaller(caller.id)}
                        color="error"
                      >
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
          <DialogTitle style={{ fontWeight: "bolder" }}>Add Caller</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={newCaller.name}
              onChange={(e) =>
                setNewCaller({ ...newCaller, name: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={newCaller.description}
              onChange={(e) =>
                setNewCaller({ ...newCaller, description: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <PhoneInput
              placeholder="Enter phone number"
              value={newCaller.phoneNumber}
              onChange={(e) => setNewCaller({ ...newCaller, phoneNumber: e })}
            />
          </DialogContent>
          <DialogActions style={{ margin: "10px" }}>
            <Button
              variant="contained"
              onClick={() => setOpenPopup(false)}
              color="error"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddCaller}
              color="primary"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditPopup} onClose={() => setOpenEditPopup(false)}>
          <DialogTitle style={{ fontWeight: "bolder" }}>
            Edit Caller
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              placeholder="Enter name"
              onChange={(e) =>
                setEditCaller({ ...editCaller, name: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              placeholder="Enter description"
              onChange={(e) =>
                setEditCaller({ ...editCaller, description: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <PhoneInput
              placeholder="Enter phone number"
              onChange={(e) => setEditCaller({ ...editCaller, phoneNumber: e })}
            />
          </DialogContent>
          <DialogActions style={{ margin: "10px" }}>
            <Button
              variant="contained"
              onClick={() => setOpenEditPopup(false)}
              color="error"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleEditCaller}
              color="primary"
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </div>

      <div>
        <IconButton
          style={{ position: "absolute", right: "2%", bottom: "5%" }}
          onClick={() => setOpenPopup(true)}
        >
          <AddCircleRoundedIcon
            variant="outlined"
            color="primary"
            sx={{ fontSize: 80 }}
            // onClick={() => setOpenPopup(true)}
          >
            Add Caller
          </AddCircleRoundedIcon>
        </IconButton>
        <div />

        <div
          style={{
            display: "flex",
            justifyContent: "center",

            bottom: "7%",
            width: "50%",
            paddingTop: "10px",

            marginLeft: "auto",
            marginRight: "auto",
            borderStyle: constants.BORDER_STYLE,
          }}
        >
          <Pagination
            count={total}
            shape="rounded"
            size="large"
            onChange={(e, page) => pageChange(e, page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Caller;
