import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import styles from "../Team.module.scss";

export interface TeamItemProps {
  tImg?: string | StaticImageData;
  slug: string;
  name: string;
  title: string;
  onClick?: () => void;
}

const TeamItem: React.FC<TeamItemProps> = (props) => (
  <div className={styles["wpo-team-item"]}>
    <div className={styles["wpo-team-img"]}>
      <Image
        src={props.tImg || "/assets/images/default/team_item.jpg"}
        width={330}
        height={371}
        alt=""
      />
    </div>
    <div className={styles["wpo-team-content"]}>
      <h2>{props.name}</h2>
      <span>{props.title}</span>
    </div>
  </div>
);

export default TeamItem;
