import { useContext } from "react";

import { ConfirmBoxContext } from "../contexts/ConfirmBoxContext";

const useConfirmBox = () => (
    useContext(ConfirmBoxContext)
)

export default useConfirmBox;