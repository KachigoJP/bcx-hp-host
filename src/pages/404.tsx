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
            facebook: "https://facebook.com/banchanxanh",
            instagram: "https://instagram.com/banchanxanh",
            google: "https://plus.google.com/banchanxanh",
            email: "thongbao@banchanxanh.com",
            phone: "(+081) 080-5988-2754",
            headerHenu: [
                { id: 1, title: "Trang chủ", link: "/" },
                { id: 2, title: "Về chúng tôi", link: "/about" },
                { id: 3, title: "Hoạt động", link: "/activities" },
                { id: 4, title: "Tin tức", link: "/news" },
                { id: 5, title: "Liên hệ", link: "/contact" }
            ],
            footerQuicklinks: [
                { id: 1, title: "Về chúng tôi", link: "/about" },
                { id: 2, title: "Hoạt động", link: "/activities" },
                { id: 3, title: "Tin tức", link: "/news" },
                { id: 4, title: "Liên hệ", link: "/contact" }
            ],
            footerMenu: [
                { id: 1, title: "Chính sách", link: "/policy" },
                { id: 2, title: "Báo cáo", link: "/reports" },
                { id: 3, title: "Thành tựu", link: "/achievements" },
                { id: 4, title: "Tham gia", link: "/join" }
            ],
        }}>
            <PageTitle pageTitle={'404'} pagesub={'404'} />
            <Error />
        </Layout>
    );
};

export default Page404;


