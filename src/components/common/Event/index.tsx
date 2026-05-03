import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Events from "@api/event";
import styles from "./Event.module.scss";

interface Event {
  eImg: string;
  date: string;
  eTitle: string;
  slug: string;
  dec: string;
}

interface EventSection3Props {
  events: Event[];
}

const EventSection: React.FC<EventSection3Props> = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <div className={`${styles["wpo-event-area"]} ${styles["style-s2"]} bg-green section-padding`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="wpo-section-title">
              <span>Events</span>
              <h2>Fundraising Events</h2>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form,
              </p>
            </div>
          </div>
        </div>
        <div className={styles["wpo-event-wrap"]}>
          <div className="row justify-content-center">
            <div className="col col-lg-10">
              {Events.slice(3, 6).map((event: Event, eitem: number) => (
                <div className={styles["wpo-event-single"]} key={eitem}>
                  <div className={styles["wpo-event-item"]}>
                    <div className={styles["wpo-event-img"]}>
                      <Image src={event.eImg} alt="" />
                    </div>
                    <div className={styles["wpo-event-content"]}>
                      <div className={styles["wpo-event-text-top"]}>
                        <span>{event.date}</span>
                        <h2>
                          <Link
                            onClick={ClickHandler}
                            href="/event-single/[slug]"
                            as={`/event-single/${event.slug}`}
                          >
                            {event.eTitle}
                          </Link>
                        </h2>
                        <p>{event.dec}</p>
                        <Link
                          onClick={ClickHandler}
                          className={styles["read-more"]}
                          href="/event-single/[slug]"
                          as={`/event-single/${event.slug}`}
                        >
                          Learn More...
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSection;
