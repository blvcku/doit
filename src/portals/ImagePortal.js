import ReactDom from 'react-dom';

const ImagePortal = ({ children }) =>
    ReactDom.createPortal(<>{children}</>, document.getElementById('image'));

export default ImagePortal;
