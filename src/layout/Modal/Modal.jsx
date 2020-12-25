import React from "react";
import styled from "styled-components";
import MuiDialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const Dialog = styled(MuiDialog)`
  .modal__title {
  }
  
  .MuiDialog-paper {
    text-align: center  ;
    padding: calc(var(--spacing) * 4)  calc(var(--spacing) * 2);
  }

  .MuiDialogActions-root {
    margin-top: calc(var(--spacing) * 3);
    justify-content: center
  }

  .modal__closeButton {
    position: absolute;
    top: calc(var(--spacing) * 1);
    right: calc(var(--spacing) * 1);
  }
`;


export default function Modal({onClose, open, title, content, actions}) {

  return (
    <div>
      <Dialog open={open} maxWidth="xs" onClose={onClose}>
        <DialogTitle className="modal__title">
          {title}
          <IconButton aria-label="close" className="modal__closeButton" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
        {actions}
        </DialogActions>
      </Dialog>
    </div>
  );
}
