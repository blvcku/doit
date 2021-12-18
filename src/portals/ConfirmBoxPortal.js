import ReactDom from "react-dom";

const ConfirmBoxPortal = ({children}) => (
    ReactDom.createPortal(
        <>
            {children}
        </>,
        document.getElementById('confirm-box')
    )
)

export default ConfirmBoxPortal;