import React from "react";
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    EffectFade,
} from "swiper/modules";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import "swiper/css/effect-fade";

// Source
import { SwiperProps } from "./interface";

const SwiperSlider: React.FC<React.PropsWithChildren<SwiperProps>> = (
    props
) => {
    const { children, layout, spaceBetween = 50, slidesPerView = 4 } = props;

    const { nav, dots } = layout;

    return (
        <div className={`swiper-main-wrapper ${nav} ${dots}`}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                loop={true}
                autoplay={{
                    delay: 500,
                    disableOnInteraction: false,
                }}
                centeredSlides={true}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
            >
                {children}
            </Swiper>
        </div>
    );
};

export default SwiperSlider;
