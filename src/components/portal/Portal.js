import ReactDom from "react-dom";

const Portal = ({children}) => (
    ReactDom.createPortal(
        <>
            {children}
        </>,
        document.getElementById('portal')
    )
)

export default Portal;