// import { Breadcrumb } from "gatsby-plugin-breadcrumb";
import { Col, Container, Row } from "react-bootstrap";

// Sources
import { BreadcrumbProps } from "./interface";
import { PageBreadcrumbWrap, PageTitleContent } from "./style";

const Breadcrumb: React.FC<React.PropsWithChildren<BreadcrumbProps>> = (
    props
) => {
    const { title, pageContext } = props;

    const {
        breadcrumb: { crumbs },
    } = pageContext;

    const customCrumbLabel = location.pathname.toLowerCase();
    const crumbLabelArr = customCrumbLabel.split("/");
    const label = crumbLabelArr[crumbLabelArr.length - 1];
    const labelArr = label.split("-");
    const disableLinks = [
        "/events",
        "/category",
        "/profile",
        "/date",
        "/tag",
        "/page",
        "/blog",
        "/blog/page",
        "/blogs",
        "/services",
    ];
    return (
        <PageBreadcrumbWrap>
            <Container>
                <Row>
                    <Col>
                        <PageTitleContent>
                            {/* <Breadcrumb
                                title={title}
                                crumbs={crumbs}
                                crumbLabel={labelArr.join(" ")}
                                disableLinks={disableLinks}
                            /> */}
                        </PageTitleContent>
                    </Col>
                </Row>
            </Container>
        </PageBreadcrumbWrap>
    );
};

export default Breadcrumb;
