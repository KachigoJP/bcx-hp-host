import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { SwiperSlide } from "swiper/react";

// Source
import SectionTitle from "@components/common/title";
import TestimonialItem from "@components/ui/testimonial-item";
import Swiper from "@components/common/swiper";
import {
    SectionArea,
    TitleWrap,
    TestimonialContent,
    NavigationWrap,
} from "./style";
import { ITestimoniaItem } from "./interface";

const TestimonialArea: React.FC = () => {
    const testimonialQuery = useStaticQuery(graphql`
        query {
            allTestimonial {
                nodes {
                    id
                    person_name
                    person_title
                    person_photo {
                        gatsbyImage(width: 300)
                    }
                    content
                }
            }
        }
    `);
    const testimonialData = testimonialQuery.allTestimonial.nodes as any[];

    return (
        <SectionArea>
            <Container>
                <Row>
                    <Col md={12} lg={4} xl={5}>
                        <TitleWrap>
                            <SectionTitle
                                titleStyle
                                textWhate
                                texttheme
                                css={{
                                    mb: [
                                        "30px",
                                        "50px",
                                        "80px",
                                        "110",
                                        "123px",
                                    ],
                                }}
                                subTitle={"Cảm nghĩ cá nhân"}
                                title={"Mọi người nói gì về chúng tôi?"}
                            />
                        </TitleWrap>
                    </Col>
                    <Col md={12} lg={7} xl={6}>
                        <TestimonialContent>
                            <div className="testimonial-slider-content">
                                <Swiper
                                    layout={{
                                        nav: "testimonial-slider-navigation",
                                        dots: "testimonial-dots-style",
                                    }}
                                    effect="fade"
                                    slidesPerView={1}
                                    spaceBetween={0}
                                >
                                    {testimonialData &&
                                        testimonialData.map((item: any) => {
                                            return (
                                                <SwiperSlide key={item.id}>
                                                    <TestimonialItem
                                                        client={
                                                            item.person_name
                                                        }
                                                        clientSaidText={
                                                            item.content
                                                        }
                                                        clientDesignation={
                                                            item.person_title
                                                        }
                                                        clientImage={
                                                            item.person_photo
                                                        }
                                                    />
                                                </SwiperSlide>
                                            );
                                        })}
                                </Swiper>
                                <NavigationWrap>
                                    <div className="swiper-button-prev">
                                        <StaticImage
                                            className="icon-img"
                                            src="../../../../assets/images/icons/test-arrow-left.png"
                                            alt="Image-Icon"
                                        />
                                    </div>
                                    <div className="swiper-button-next">
                                        <StaticImage
                                            className="icon-img"
                                            src="../../../../assets/images/icons/test-arrow-right.png"
                                            alt="Image-Icon"
                                        />
                                    </div>
                                </NavigationWrap>
                            </div>
                        </TestimonialContent>
                    </Col>
                </Row>
            </Container>
        </SectionArea>
    );
};

export default TestimonialArea;
