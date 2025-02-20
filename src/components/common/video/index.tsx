import React from "react";
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

// Source
import { VideoProps } from "./interface";

const Video: React.FC<VideoProps> = (props) => {
    return (
        <Modal isOpen={props.isOpen} onRequestClose={() => props.setOpen(false)}>
            <ReactPlayer url={props.videoId} controls />
        </Modal>
    );
};
export default Video;
