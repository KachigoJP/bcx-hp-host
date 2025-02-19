import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// Source
import Button from "@components/common/button";
import {
    EventItemWrap,
    Thumb,
    ContentArea,
    EventInfo,
    EventName,
} from "./style";
import { EventItemProps } from "./interface";

const EventItem: React.FC<EventItemProps> = (props) => {
    const { title, eventDate, eventSubject, thumbImg, slug } = props;
    const image = getImage(thumbImg);

    return (
        <EventItemWrap>
            <Thumb>
                {image ? (
                    <GatsbyImage
                        className="thumb-img"
                        image={image}
                        alt="Image-Givest"
                    />
                ) : null}

                <Button
                    className="btn-theme"
                    size="small"
                    color="theme-gradient"
                    path={`/events/${slug}`}
                >
                    Join Now
                    <i
                        className="flaticon-right-arrow"
                        css={{ fontSize: "12px" }}
                    ></i>
                </Button>
            </Thumb>
            <ContentArea>
                <EventInfo>
                    {eventDate} {"//"} <span>{eventSubject}</span>
                </EventInfo>
                <EventName>
                    <Link to={`/events/${slug}`}>{title}</Link>
                </EventName>
            </ContentArea>
        </EventItemWrap>
    );
};

export default EventItem;
