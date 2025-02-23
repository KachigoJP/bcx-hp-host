import React from "react";
import ModalVideo from "react-modal-video";

// Source
import { VideoProps } from "./interface";

const Video: React.FC<VideoProps> = (props) => {
    return (
        <ModalVideo
            channel="youtube"
            isOpen={props.isOpen}
            videoId={props.videoId}
            onClose={() => props.setOpen(false)}
        />
    );
};

export default Video;
