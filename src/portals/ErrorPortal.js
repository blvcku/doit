import ReactDom from 'react-dom';

const ErrorPortal = ({ children }) =>
    ReactDom.createPortal(<>{children}</>, document.getElementById('error'));

export default ErrorPortal;
