import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import ReactDOM from "react-dom";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            <CloseIcon />
          </a>
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledModalBody>{children}</StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return modalContent;
  } else {
    return null;
  }
};
const StyledModalBody = styled.div`
  

  
  @media (min-width: 320px) and (max-width: 450px){
   width: 100%;
   
  }
`;
const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
  @media (min-width: 320px) and (max-width: 680px){

  }
`;
const StyledModalTitle = styled.div`
  display: flex;
  justify-content:center;
  font-size: 30px;
  font-weight: bold;
  color:#AD8259;
  @media (min-width: 320px) and (max-width: 430px){
    font-size: 30px;
  
  }
  @media (min-width: 768px) and (max-width: 1020px){
    font-size: 32px;
  }
  @media (min-width: 1024px) {
    font-size: 38px;
    
  }
  @media (min-width: 1280px) {
    font-size: 26px;
    
    
  }
  @media (min-width: 1440px) {
    font-size: 40px;
    
  }
`;
const StyledModal = styled.div`
  background:#fdfff5;
  background-opacity:30;
  width: 700px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;

  @media (min-width: 320px) and (max-width: 430px){
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 5px;
    padding-right: 5px;
    height:auto;
  }
  @media (min-width: 768px) and (max-width: 1020px){
    width: 600px;
    height:auto;
  }
  
  @media (min-width: 1024px) {
    
    width: 800px;
    height:auto;
  }

  @media (min-width: 1280px) {
    height:auto;
    width: 550px;
    margin-top:15px;
    margin-bottom:15px;
  }
  @media (min-width: 1440px) {
    height:auto;
    width: 1000px;
  }
  
`;
const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-color: rgba(0, 0, 0, 0.5);

  @media (min-width: 320px) and (max-width: 435px){
    
    height:100%;
  }
  
  @media (min-width: 768px) and (max-width: 1020px){
    height:100%;
  }
  @media (min-width: 1024px) {
    
    height: 922px;
  }
  @media (min-width: 1280px) {
    height: auto;
    padding-bottom:10px;
   
  }
  @media (min-width: 1440px) {
    height:1020px;
  }
`;

export default Modal;
