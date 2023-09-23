import React from 'react';
import { useState } from 'react';
import { Modal, Button } from "react-bootstrap";

const DeleteConfirm = ({ show, handleClose, recipeId, handleDelete }) => {
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this recipe? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="customSecondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="customDanger" onClick={() => handleDelete(recipeId)}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
};

export default DeleteConfirm;


