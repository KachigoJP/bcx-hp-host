import React from 'react';
import Layout from '@components/layout';
import PageTitle from '@components/common/PageTitle';
import Error from '@components/containers/404';

interface PageProps { }

const Page404: React.FC<PageProps> = (props) => {
    return (
        <Layout data={{
            logo: "/assets/images/logo.png",
            slogan: "",
            footerSlogan:
                "Welcome and open yourself to your truest love this year with us! With the Release Process",
            facebook: "",
            instagram: "",
            google: "",
            email: "thongbao@banchanxanh.com",
            phone: "(+081) 080-5988-2754",
            headerHenu: [],
            footerQuicklinks: [],
            footerMenu: [],
        }}>
            <PageTitle pageTitle={'404'} pagesub={'404'} />
            <Error />
        </Layout>
    );
};

export default Page404;


