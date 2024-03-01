"use client"
import React from "react";
import { Button, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";    
import { ToastContainer, toast } from 'react-toastify';

import {VerticalDotsIcon} from "./icons";
import 'react-toastify/dist/ReactToastify.css';
import { CustomModalType, FocusedTodoType, Todo } from "@/types";

const CustomModal = ({}: {}) => {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{currentModalData.modalType}</ModalHeader>
      <ModalBody>
          <p> 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam pulvinar risus non risus hendrerit venenatis.
          Pellentesque sit amet hendrerit risus, sed porttitor quam.
          </p>
      </ModalBody>
      <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose} >
          Close
          </Button>
          <Button color="primary" onPress={onClose}>
          Action
          </Button>
      </ModalFooter>
    </>

  )
}

export default CustomModal;