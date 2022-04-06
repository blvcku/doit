import ReactDom from 'react-dom';

const DashboardPortal = ({children}) => (
    ReactDom.createPortal(
        <>
            {children}
        </>,
        document.getElementById('dashboard')
    )
)

export default DashboardPortal;