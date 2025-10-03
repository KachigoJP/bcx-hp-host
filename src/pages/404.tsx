import PageTitle from "@components/common/PageTitle";
import Error from "@components/containers/404";
import Layout from "@components/layout";
import React from "react";

const Page404: React.FC<unknown> = (props) => {
  return (
    <Layout
      data={{
        logo: "/assets/images/logo.png",
        slogan: "",
        footerSlogan:
          "Cùng chúng tôi khám phá vẻ đẹp thiên nhiên Nhật Bản và xây dựng cộng đồng người Việt gắn kết.",
        facebook: "https://facebook.com/banchanxanhjp",
        instagram: "https://instagram.com/banchanxanh.kt",
        google: "",
        email: "info@banchanxanh.com",
        phone: "080-4734-3979",
        headerMenus: [
          { menuId: "1", title: "Trang chủ", link: "/" },
          { menuId: "2", title: "Về chúng tôi", link: "/about" },
          { menuId: "3", title: "Hoạt động", link: "/activity" },
          { menuId: "4", title: "Tin tức", link: "/new" },
          { menuId: "5", title: "Liên hệ", link: "/contact" },
        ],
        footerQuicklinksTitle: "Liên kết nhanh",
        footerContactTitle: "Liên hệ",
        footerContactDescription: "Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi",
        footerMenusTitle: "Liên kết nhanh",
        footerQuicklinks: [
          { menuId: "1", title: "Về chúng tôi", link: "/about" },
          { menuId: "2", title: "Hoạt động", link: "/activity" },
          { menuId: "3", title: "Tin tức", link: "/new" },
          { menuId: "4", title: "Liên hệ", link: "/contact" },
        ],
        footerMenus: [
          { menuId: "1", title: "Chính sách", link: "/policy" },
          { menuId: "2", title: "Báo cáo", link: "/report" },
          { menuId: "3", title: "Thành tựu", link: "/achievement" },
          { menuId: "4", title: "Tham gia", link: "/join" },
        ],
      }}
    >
      <PageTitle pageTitle={"404"} pagesub={"404"} />
      <Error />
    </Layout>
  );
};

export default Page404;
