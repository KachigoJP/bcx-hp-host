import { LayoutProps } from "@components/layout";
import { IMenuItem } from "./interfaces";

export const getDefaultLayoutData = (): LayoutProps => {
  const headerMenus: IMenuItem[] = [
    {
      menuId: "1",
      title: "Trang chủ",
      link: "/",
    },
    {
      menuId: "2",
      title: "Giới thiệu",
      link: "/about",
      subMenuItems: [
        {
          menuId: "21",
          title: "Về chúng tôi",
          link: "/about",
        },
        {
          menuId: "22",
          title: "Đội ngũ",
          link: "/team",
        },
        {
          menuId: "23",
          title: "Thành tựu",
          link: "/achievement",
        },
        {
          menuId: "24",
          title: "Báo cáo hoạt động",
          link: "/report",
        },
        {
          menuId: "25",
          title: "Chính sách hoạt động",
          link: "/policy",
        },
      ],
    },
    {
      menuId: "3",
      title: "Hoạt động",
      link: "/activity",
      subMenuItems: [
        {
          menuId: "31",
          title: "Hiking (Leo núi)",
          link: "/hiking",
        },
        {
          menuId: "32",
          title: "Camping (Cắm trại)",
          link: "/camping",
        },
        {
          menuId: "33",
          title: "Workshop",
          link: "/workshop",
        },
      ],
    },
    {
      menuId: "4",
      title: "Tin tức",
      link: "/new",
    },
    {
      menuId: "5",
      title: "Liên hệ",
      link: "/contact",
    },
    {
      menuId: "6",
      title: "Tham gia cùng chúng tôi",
      link: "/join",
    },
    {
      menuId: "7",
      title: "Đóng góp",
      link: "/donate",
    },
  ];

  const footerMenus: IMenuItem[] = [
    {
      menuId: "1",
      title: "Trang chủ",
      link: "/",
    },
    {
      menuId: "2",
      title: "Hoạt động",
      link: "/activity",
    },
    {
      menuId: "3",
      title: "Tin tức",
      link: "/new",
    },
    {
      menuId: "4",
      title: "Liên hệ",
      link: "/contact",
    },
  ];

  const footerQuicklinks: IMenuItem[] = [
    {
      menuId: "1",
      title: "Điều khoản sử dụng",
      link: "/term",
    },
    {
      menuId: "2",
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
      facebook: "https://www.facebook.com/banchanxanhjp",
      instagram: "https://www.instagram.com/banchanxanh.kt",
      google: "",
      email: "info@banchanxanh.com",
      phone: "080-4734-3979",
      headerMenus,
      footerQuicklinksTitle: "Liên kết nhanh",
      footerContactTitle: "Liên hệ",
      footerContactDescription: "Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi",
      footerMenusTitle: "Liên kết nhanh",
      footerQuicklinks,
      footerMenus,
    },
  };
};
