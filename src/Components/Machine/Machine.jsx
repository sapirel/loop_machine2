import { useState, useEffect } from 'react';
import { Pad } from '../Pad';
import Button from '@material-ui/core/Button';

import './Machine.css'

const Machine = ({ palyList }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingQueue, setPlayingQueue] = useState([]);
    const [start, setStart] = useState(0);
    const [timerList, setTimerList] = useState([]);
    /**
     * 
     * @param {*} square - pad
     * stop playning the selected pad 
     */
    const stopSquare = (square) => {
        square.audio.pause();
        square.audio.currentTime = 0;
    }
    /**
     * 
     * @param {*} square - selected pad
     * create loop which play the selected play 
     */
    const playSquareLoop = (square) => {
        square.audio.addEventListener('ended', () => {
            square.audio.currentTime = 0;
            square.audio.play();

        })
        square.audio.play();
    }
    useEffect(() => {
        if (isPlaying) {
            setStart(Date.now())
            playingQueue.forEach(square => playSquareLoop(square))
            // const interv = setInterval(() => {
            //     playingQueue.forEach((square) => {
            //         square.audio.play();
            //     })

            // })
            // return () => clearInterval(interv)
        }
        else {
            //clear all new pad, which waiting for the next loop
            timerList.forEach(timer => {
                clearTimeout(timer);
            })
            playingQueue.forEach((square) => {
                square.audio.removeEventListener('ended', () => {
                    square.audio.currentTime = 0;
                    square.audio.play();

                });
                stopSquare(square);
            })
        }
    }, [isPlaying])


    //manage queue of playlist
    const UpdateLoopTOq = (elm) => {
        let { id, audio } = elm;
        let isfAudioInPlayList = playingQueue.find(obj => obj.id == id);
        let newElm = { id, audio: new Audio(audio) };
        setPlayingQueue([...playingQueue, newElm])
        if (!isfAudioInPlayList) {
            if (playingQueue.length > 0) {
                let millis = Date.now() - start;
                let secondsFromStartedLoop = (Math.floor(millis / 1000));
                let secondWait = (8 - (secondsFromStartedLoop % 8)) * 1000;
                const timer = setTimeout(() => {
                        playSquareLoop(newElm);
                }, secondWait);
                setTimerList([...timerList, timer])
            } else {
                if (isPlaying)
                    playSquareLoop(newElm);
            }
        }
        else {
            let new_q = playingQueue;
            let index = playingQueue.findIndex(obj => obj.id == id);
            new_q.splice(index, 1);
            stopSquare(isfAudioInPlayList);
            setPlayingQueue([...new_q]);
        }

    }

    const renderMachine = () => {
        return palyList.map(elm => {
            let { audio, id, color, name } = elm;
            const isPlayning = (playingQueue.findIndex((elm => elm.id == id))) > -1;
            return <Pad key={id} name={name} audio={audio} id={id} color={color} playing={isPlayning} update={UpdateLoopTOq} />
        })
    }
    const machineChangeStatus = () => {
        setIsPlaying(!isPlaying);
    }
    console.log('-playingQueue->', playingQueue);
    return (
        <div className='container'>
            <div className="loop_machine">
                <div className='header'>
                    <Button variant="contained" color="primary" onClick={machineChangeStatus}>
                        {isPlaying ? "Pause" : "Play"}
                    </Button>
                </div>
                <div className='pad_container'>
                    {renderMachine()}
                </div>
            </div>
        </div>
    )
}
export default Machine;