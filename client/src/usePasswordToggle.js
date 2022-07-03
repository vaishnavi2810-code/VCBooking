import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from "react";

const usePasswordToggle = function(){
    const [visible, setVisibility] = useState(false);
        const Icon = (
            <FontAwesomeIcon icon={visible ? faEyeSlash : faEye}
                onClick={() => setVisibility(visibility => !visibility)} />
        )
        const InputType = visible ? "text" : "password"
        return [InputType, Icon]
}

export default usePasswordToggle;