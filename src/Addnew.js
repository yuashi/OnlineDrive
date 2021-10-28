import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Content from "./Content";
import data from "./data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Addnew = () => {
  const [open, setOpen] = useState(false);
  const [isFile, setIsFile] = useState(true);
  const [name, setName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [err, setErr] = useState(false);
  const [payload, setPayload] = useState(data);

  const addNewContent = () => {
    const obj = {
      name: name,
      isFile: isFile,
    };
    let found = payload.find((d) => {
      if (d.name === obj.name) {
        return true;
      }
    });
    if (found) {
      setErr(true);
    } else {
      setPayload([...payload, obj]);
      handleClose();
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          <div className="modal-box">
            <p
              id="modal-title"
              style={{ textAlign: "center", marginBottom: "10px" }}
            >
              Create New
            </p>
            <img
              src="./imgs/close.png"
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                width: 10,
                height: 10,
              }}
              onClick={handleClose}
            />
            <ButtonGroup
              variant="outlined"
              aria-label="outlined button group"
              size="small"
              style={{
                alignItems: "center",
                margin: "10px",
                marginLeft: "40px",
              }}
            >
              <Button
                onClick={() => setIsFile(true)}
                variant={isFile ? "contained" : "outlined"}
              >
                File
              </Button>
              <Button
                onClick={() => setIsFile(false)}
                variant={isFile ? "outlined" : "contained"}
              >
                Folder
              </Button>
            </ButtonGroup>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErr(false);
              }}
            />
            <p style={{ display: err ? "block" : "none", color: "red" }}>
              File/Folder name already exists !
            </p>
            <Button
              style={{ marginTop: "10px", marginLeft: "50px" }}
              variant="contained"
              onClick={(e) => {
                addNewContent();
              }}
            >
              Create
            </Button>
          </div>
        </Box>
      </Modal>
      <div className="content">
        <Content payload={payload} setPayload={setPayload} />
        <div className="add">
          <img
            src="./imgs/add_new_button.png"
            style={{ width: 70, height: 70, cursor: "grab" }}
            onClick={handleOpen}
          ></img>
        </div>
      </div>
    </>
  );
};
export default Addnew;
