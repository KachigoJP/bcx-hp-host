import React from "react";
import Slider from "react-slick";
import { StaticImageData } from "next/image";
import Image from "next/image";
import styles from "@components/containers/Home/Team/TeamSocial.module.css";
import TeamItem from "@components/common/TeamItem";

export interface TeamItem {
  tImg?: string | StaticImageData;
  slug: string;
  name: string;
  title: string;
}

export interface TeamProps {
  title: string;
  subtitle: string;
  description: string;
  items: TeamItem[];
}

const TeamSection: React.FC<TeamProps> = ({
  items,
  title,
  subtitle,
  description,
}) => {
  const settings = {
    dots: false,
    arrows: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const clickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section className="wpo-team-section section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="wpo-section-title">
              <span>{subtitle}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div className="wpo-team-wrap">
          <div className="team-slider">
            <Slider {...settings}>
              {items.slice(0, 6).map((team: TeamItem, tm: number) => (
                <TeamItem key={tm} {...team} onClick={clickHandler} />
                // <div key={tm} className={`wpo-team-item ${styles.wpoTeamItem}`}>
                //   <div className={`wpo-team-img ${styles.wpoTeamImg}`}>
                //     <Image
                //       src={team.tImg || "/assets/images/default/team_item.jpg"}
                //       alt={team.name}
                //       width={300}
                //       height={300}
                //       style={{ width: "100%", height: "auto" }}
                //     />
                //     <div className={`wpo-team-social ${styles.wpoTeamSocial}`}>
                //       <ul>
                //         <li>
                //           <a href={"#"}>
                //             <i className="ti-gmail"></i>
                //           </a>
                //         </li>
                //       </ul>
                //     </div>
                //   </div>
                //   <div className="wpo-team-content">
                //     <h3>{team.name}</h3>
                //     <span>{team.title}</span>
                //   </div>
                // </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
