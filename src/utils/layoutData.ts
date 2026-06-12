import { LayoutProps } from "@components/layout";
import { HeaderButton, IMenuItem } from "./interfaces";

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
          title: "Outdoor (Ngoài trời)",
          link: "/outdoor",
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
      title: "Tham gia",
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

  const rightButtons: HeaderButton[] = [
    {
      buttonId: "login",
      type: "link",
      label: "Đăng nhập",
      link: "/login",
    },
    {
      buttonId: "logout",
      type: "link",
      label: "Đăng xuất",
      link: "#",
      icon: "ti-power-off",
    },
    {
      buttonId: "search",
      type: "search",
      label: "Tìm kiếm...",
      icon: "ti-search",
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
      rightButtons,
      footerQuicklinksTitle: "Liên kết nhanh",
      footerContactTitle: "Liên hệ",
      footerContactDescription:
        "Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi",
      footerMenusTitle: "Liên kết nhanh",
      footerQuicklinks,
      footerMenus,
    },
  };
};
