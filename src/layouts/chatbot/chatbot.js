import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ChatBubble = ({ url }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    injectScript.async = true;
    document.body.appendChild(injectScript);

    const configScript = document.createElement('script');
    configScript.src = 'https://mediafiles.botpress.cloud/634d2b82-4a73-4676-85d7-764180e85b0f/webchat/config.js';
    configScript.defer = true;
    document.body.appendChild(configScript);

    return () => {
      document.body.removeChild(injectScript);
      document.body.removeChild(configScript);
    };
  }, []); // El segundo parámetro del useEffect es un array vacío, lo que significa que se ejecutará solo una vez al montar el componente.

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
      <div className="chat-bubble" onClick={openModal}>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Chat Modal"
        style={{
          overlay: {
            backgroundColor: 'transparent',
          },
          content: {
            position: 'absolute',
            bottom: '0',
            right: '0',
            left: 'auto',
            top: 'auto',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'hidden',
            borderRadius: '8px',
            outline: 'none',
            padding: '20px',
            maxWidth: '400px',
            maxHeight: '80vh',
          },
        }}
      >
        <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Cerrar</button>
        <iframe title="Chat Bot" src={url} width="100%" height="400px"></iframe>
      </Modal>
    </div>
  );
};

export default ChatBubble;