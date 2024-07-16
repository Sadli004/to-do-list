import React from "react";

export const ConfirmationModal = ({ confirmDelete }) => {
  return (
    <div className="confirmation-modal">
      <p>Are you sure you want to delete this task?</p>
      <button
        className="confirmation-button"
        onClick={() => confirmDelete(true)}
      >
        Yes
      </button>
      <button
        className="confirmation-button"
        onClick={() => confirmDelete(false)}
      >
        No
      </button>
    </div>
  );
};
