import { Link, HeadFC, PageProps } from "gatsby";

import Layout from "@components/layout";
import SEO from "@components/common/seo";
// import PageBreadcrumb from "@components/common/breadcrumb";
import ContactUsArea from "@components/containers/contact-us";

// const ContactPages = ({ location, pageContext }) => {

const ContactPages: React.FC<PageProps> = (props) => {
    const { pageContext, location } = props;
    return (
        <Layout>
            <SEO title="Contact Pages" pathname="/" />
            {/* <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title="Liên Hệ"
            /> */}
            <ContactUsArea />
        </Layout>
    );
};

// ContactPages.propTypes = {
//     location: PropTypes.object,
//     pageContext: PropTypes.object,
// };

export default ContactPages;
