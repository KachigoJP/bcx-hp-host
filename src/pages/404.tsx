import PageTitle from '@components/common/PageTitle';
import Error from '@components/containers/404';
import Layout from '@components/layout';
import React from 'react';

interface PageProps { }

const Page404: React.FC<PageProps> = (props) => {
    return (
        <Layout data={{
            logo: "/assets/images/logo.png",
            slogan: "",
            footerSlogan:
                "Cùng chúng tôi khám phá vẻ đẹp thiên nhiên Nhật Bản và xây dựng cộng đồng người Việt gắn kết.",
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


