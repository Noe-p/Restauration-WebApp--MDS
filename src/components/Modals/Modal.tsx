import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

interface ModalProps extends ReactModal.Props {
  children?: ReactNode;
  className?: string;
}

export function Modal(props: ModalProps): JSX.Element {
  const { children, className } = props;

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
      padding: '0',
      boxShadow:
        '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <ReactModal
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={200}
      ariaHideApp={false}
      style={customStyles}
      {...props}
      className={className}
    >
      <ModalContainer>{children}</ModalContainer>
    </ReactModal>
  );
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  min-width: 500px;
`;
