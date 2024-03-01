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
          <p>깃허브 업로드</p>
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