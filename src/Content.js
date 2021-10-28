import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Content = ({ payload, setPayload }) => {
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

  const [contextMenu, setContextMenu] = useState(null);
  const [newname, setNewname] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [old, setOld] = useState({});

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleRename = () => {
    setContextMenu(null);
    const found = payload.findIndex((obj) => obj.name === old.name);
    payload[found].name = newname;
    setPayload(payload);
    handleCloseModal();
  };

  const handleDelete = (item) => {
    const newdata = payload.filter((d) => d.name != item);
    setPayload(newdata);
    setContextMenu(null);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
      >
        <Box sx={style}>
          <div className="modal-box">
            <p
              id="modal-title"
              style={{ textAlign: "center", marginBottom: "10px" }}
            >
              Rename
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
              onClick={handleCloseModal}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              margin="normal"
              value={newname}
              onChange={(e) => {
                setNewname(e.target.value);
              }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleRename()}
            >
              Rename
            </Button>
          </div>
        </Box>
      </Modal>

      <div className="content">
        {payload ? (
          payload.map((d) => {
            let url = `/${d.name}`;
            return (
              <div
                className="folder"
                onContextMenu={handleContextMenu}
                style={{ cursor: "context-menu" }}
              >
                <Link to={url}>
                  <img
                    src={d.isFile ? "./imgs/file.png" : "./imgs/folder.png"}
                    style={{ width: 70, height: 70 }}
                  />
                </Link>
                <p>{d.name}</p>
                <Menu
                  open={contextMenu !== null}
                  onClose={() => setContextMenu(null)}
                  anchorReference="anchorPosition"
                  anchorPosition={
                    contextMenu !== null
                      ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                      : undefined
                  }
                >
                  <MenuItem
                    onClick={() => {
                      handleOpenModal();
                      setOld(d);
                    }}
                  >
                    Rename
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(d.name)}>
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            );
          })
        ) : (
          <p>Nothing to show</p>
        )}
      </div>
    </>
  );
};

export default Content;
