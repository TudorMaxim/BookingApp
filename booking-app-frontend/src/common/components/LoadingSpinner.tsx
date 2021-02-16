import { FunctionComponent } from 'react';
import { ClipLoader } from 'react-spinners';
import '../styles/LoadingSpinner.sass';

const LoadingSpinner: FunctionComponent = () => (
  <div className="loading-spinner-wrapper">
    <div className="loading-spinner">
      <ClipLoader size={200} />
      <p className="loading-text" />
    </div>
  </div>
);

export default LoadingSpinner;
