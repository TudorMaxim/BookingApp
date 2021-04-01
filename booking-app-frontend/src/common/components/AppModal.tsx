import { FunctionComponent, useState } from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/AppModal.sass';

export const useAppModal = (intialState: boolean): [boolean, () => void] => {
  const [show, setShow] = useState(intialState);
  const toggle = () => setShow(!show);
  return [show, toggle];
};

interface IAppModalProps {
    show: boolean;
    title: string;
    onHide: () => void;
}

const AppModal: FunctionComponent<IAppModalProps> = ({
  show, title, onHide, children,
}) => (
  <Modal
    size="lg"
    show={show}
    backdrop="static"
    animation={false}
    keyboard={false}
    onHide={onHide}
  >
    <Modal.Header closeButton>
      <Modal.Title id="modal-title">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
  </Modal>
);

export default AppModal;
