import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import './Pad.scss'
const Pad = ({ id, color, audio, playing, update, name }) => {

    const [isPlaying, setIsPlaying] = useState(playing);
    useEffect(() => {
        setIsPlaying(playing)
    }, [playing])
    const click = () => {
        update({ id, audio });
        setIsPlaying(!isPlaying);
    }
    return (
        <div className={isPlaying ? 'pad pad_playning' : 'pad'} onClick={click}>
            <div className="wrapper_pad_content">
                {/* {name} */}
                {!isPlaying ? <FontAwesomeIcon icon={faPlayCircle} size="2x" className={"icon"} /> 
                            : <FontAwesomeIcon icon={faPauseCircle} size="2x" className={"icon"} />}
            </div>
        </div>
    )


}
export default Pad;