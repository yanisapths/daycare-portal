import React, { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function detailView  ({  open, handleClose, setOpen}) 


{
 
    return (
        <>
          <Dialog
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
          maxWidth="xl"
          >
            <DialogTitle
            sx={{
                color: theme.palette.primary.darker,
                fontSize: { sm: 24, md: 26, lg: 28, xl: 30 },
                mx: 2,
                mt: 2,
                textAlign: "center",
                fontWeight: "bold",
              }}>
                คอร์ส
                <div className="flex justify-end">
                    <EditIcon/>
                    <DeleteIcon/>
                </div>
            </DialogTitle>
            <DialogContent>
                <Box>
                <div className="flex flex-col text-center rounded-xl">
                    <div className="px-10">
                        <p>จำนวนคอร์สทั้งหมด</p>
                    </div>
                </div>
                </Box>

            </DialogContent>
    
          </Dialog>
        </>
      )
  
  
}

export default detailView