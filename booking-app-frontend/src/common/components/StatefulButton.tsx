import { FunctionComponent, MouseEventHandler } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import '../styles/StatefulButton.sass';

interface StatefulButtonProps {
    isLoading: boolean;
    text: string;
    variant: string;
    type?: string;
    className?: string;
    onClick?: MouseEventHandler;
}
const StatefulButton: FunctionComponent<StatefulButtonProps> = ({
  isLoading, text, type, variant, className, onClick,
}) => (
  <Button type={type} variant={variant} className={`stateful-button ${className}`} disabled={isLoading} onClick={onClick}>
    {!isLoading && text}
    {isLoading && (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    )}
  </Button>
);

export default StatefulButton;
