import { LayoutProps } from "@components/layout";

export const getDefaultLayoutData = (): LayoutProps => {
  const headerMenus = [
    {
      id: 1,
      title: "Trang chủ",
      link: "/",
    },
    {
      id: 2,
      title: "Giới thiệu",
      link: "/about",
      submenu: [
        {
          id: 21,
          title: "Về chúng tôi",
          link: "/about",
        },
        {
          id: 22,
          title: "Đội ngũ",
          link: "/team",
        },
        {
          id: 23,
          title: "Thành tựu",
          link: "/achievements",
        },
        {
          id: 24,
          title: "Báo cáo hoạt động",
          link: "/reports",
        },
        {
          id: 25,
          title: "Chính sách hoạt động",
          link: "/policy",
        },
      ],
    },
    {
      id: 3,
      title: "Hoạt động",
      link: "/activities",
      submenu: [
        {
          id: 31,
          title: "Hiking (Leo núi)",
          link: "/hiking",
        },
        {
          id: 32,
          title: "Camping (Cắm trại)",
          link: "/camping",
        },
        {
          id: 33,
          title: "Workshop",
          link: "/workshop",
        },
      ],
    },
    {
      id: 4,
      title: "Tin tức",
      link: "/news",
    },
    {
      id: 5,
      title: "Liên hệ",
      link: "/contact",
    },
    {
      id: 6,
      title: "Tham gia cùng chúng tôi",
      link: "/join",
    },
    {
      id: 7,
      title: "Đóng góp",
      link: "/donate",
    },
  ];

  const footerMenus = [
    {
      id: 1,
      title: "Trang chủ",
      link: "/",
    },
    {
      id: 2,
      title: "Hoạt động",
      link: "/activities",
    },
    {
      id: 3,
      title: "Tin tức",
      link: "/news",
    },
    {
      id: 4,
      title: "Liên hệ",
      link: "/contact",
    },
  ];

  const quickLinks = [
    {
      id: 1,
      title: "Điều khoản sử dụng",
      link: "/terms",
    },
    {
      id: 2,
      title: "Chính sách bảo mật",
      link: "/privacy",
    },
  ];

  return {
    data: {
      logo: "/assets/images/logo.png",
      slogan: "Kết nối con người - Gắn bó thiên nhiên",
      footerSlogan:
        "Cùng chúng tôi khám phá vẻ đẹp thiên nhiên Nhật Bản và xây dựng cộng đồng người Việt gắn kết.",
      facebook: "https://facebook.com/banchanxanh",
      instagram: "https://instagram.com/banchanxanh",
      google: "",
      email: "info@banchanxanh.com",
      phone: "(+81) 080-5988-2754",
      headerHenu: headerMenus,
      footerQuicklinks: quickLinks,
      footerMenu: footerMenus,
    },
  };
};
