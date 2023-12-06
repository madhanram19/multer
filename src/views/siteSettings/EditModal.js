import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const EditModal = ({ content, showModal, handleClose }) => {
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
      setEditedContent(content);
  }, [content]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Content</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="editedContent">Content:</label>
            <input
              type="text"
              className="form-control"
              id="editedContent"
              name="content"
              value={editedContent?.content || ""}
              onChange={handleInputChange}
            />
          </div>
          {/* Add other input fields as needed */}
        </form>
      </Modal.Body>

      
<Modal.Footer>

        
<Button
 
variant="secondary"
 
onClick={handleClose}>
          Close
        </Button>

        
<Button
 
variant="primary"
 
onClick={handleSaveChanges}>
          Save Changes
        </Button>

      
</Modal.Footer>

    
</Modal>
  );
};

EditModal.propTypes = {
  content: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditModal;
