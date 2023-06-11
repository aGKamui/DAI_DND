import React, { useState } from 'react';
import Modal from 'react-modal';

const customModalStyles = {
  content: {
    width: '300px',
    height: '200px',
    margin: 'auto',
    background: 'white',
    borderRadius: '4px',
    padding: '20px',
  },
};

function ConfirmationModal({ isOpen, onRequestClose, onConfirm, itemID }) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customModalStyles}
        contentLabel="Confirmation Modal"
      >
        <h2>CONFIRMAÇÃO</h2>
        <p>Tem a certeza?</p>
        <button onClick={() => onConfirm(itemID)}>Confirm</button>
        <button onClick={onRequestClose}>Cancel</button>
      </Modal>
    );
  }
  

export default ConfirmationModal;
