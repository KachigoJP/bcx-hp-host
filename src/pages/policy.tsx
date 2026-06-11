import { globalService, policyService } from "@/lib/strapi/services";
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import {
  GlobalInfo,
  PolicyContent,
  SectionIcon,
  SectionIntro,
  SectionListTextItems,
} from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import PolicyActivityPolicies from "@components/common/Policy/PolicyActivityPolicies";
import PolicyCodeOfConduct from "@components/common/Policy/PolicyCodeOfConduct";
import PolicyContact from "@components/common/Policy/PolicyContact";
import PolicyCoreValues from "@components/common/Policy/PolicyCoreValues";
import PolicyFinancial from "@components/common/Policy/PolicyFinancial";
import PolicyIntro from "@components/common/Policy/PolicyIntro";
import PolicyMissionVision from "@components/common/Policy/PolicyMissionVision";
import { getDefaultLayoutData } from "@utils/layoutData";
import React, { useEffect, useState } from "react";

interface PolicyProps {
  layout: LayoutProps;
  seo: SEOProps;
  policyContent: PolicyContent;
}

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      page_code: "policy",
      title: "Chính sách hoạt động - Bàn Chân Xanh",
      description: "Chính sách hoạt động và quy định của tổ chức Bàn Chân Xanh",
    },
  };

  const missionVision: SectionIcon[] = [
    {
      icon: "fi flaticon-target",
      title: "Sứ mệnh",
      description:
        "Kết nối cộng đồng người Việt tại Nhật Bản thông qua các hoạt động thiên nhiên, tạo môi trường giao lưu, học hỏi và phát triển bản thân, đồng thời góp phần bảo vệ môi trường và phát triển bền vững.",
    },
    {
      icon: "fi flaticon-forest",
      title: "Tầm nhìn",
      description:
        "Trở thành tổ chức cộng đồng người Việt hàng đầu tại Nhật Bản, được công nhận về các hoạt động thiên nhiên có ý nghĩa và tác động tích cực đến xã hội và môi trường.",
    },
  ];

  const coreValuesSectionIntro: SectionIntro = {
    tag: "Quy định",
    title: "Chính sách hoạt động",
    description:
      "Các quy định và nguyên tắc khi tham gia các hoạt động của tổ chức",
  };

  const coreValueSectionItems: SectionIcon[] = [
    {
      icon: "fi flaticon-user",
      title: "Đoàn kết",
      description:
        "Xây dựng tinh thần đoàn kết, hỗ trợ lẫn nhau trong cộng đồng",
    },
    {
      icon: "fi flaticon-forest",
      title: "Bảo vệ môi trường",
      description: "Tôn trọng và bảo vệ thiên nhiên trong mọi hoạt động",
    },
    {
      icon: "fi flaticon-checked",
      title: "Trách nhiệm",
      description: "Thực hiện đúng vai trò và trách nhiệm được giao",
    },
    {
      icon: "fi flaticon-graduation-cap",
      title: "Học hỏi",
      description: "Không ngừng học hỏi và phát triển bản thân",
    },
  ];

  const activityPoliciesSectionIntro: SectionIntro = {
    tag: "Quy định",
    title: "Chính sách hoạt động",
    description:
      "Các quy định và nguyên tắc khi tham gia các hoạt động của tổ chức",
  };

  const activityPoliciesSectionItems: SectionListTextItems[] = [
    {
      title: "1. Quy định tham gia",
      items: [
        { text: "Thành viên phải đăng ký trước khi tham gia hoạt động" },
        { text: "Tuân thủ hướng dẫn và quy định an toàn" },
        { text: "Mang theo đầy đủ trang thiết bị cần thiết" },
        { text: "Thông báo trước nếu không thể tham gia" },
      ],
    },
    {
      title: "2. Quy định an toàn",
      items: [
        { text: "Luôn đi theo nhóm, không tách riêng" },
        { text: "Tuân thủ hướng dẫn của trưởng nhóm" },
        { text: "Mang theo thiết bị liên lạc khẩn cấp" },
        { text: "Báo cáo ngay khi có tình huống bất thường" },
      ],
    },
    {
      title: "3. Quy định môi trường",
      items: [
        { text: "Không xả rác, mang rác về nơi quy định" },
        { text: "Không làm tổn hại đến động thực vật" },
        { text: "Tuân thủ quy định của khu vực hoạt động" },
        { text: "Tham gia các hoạt động bảo vệ môi trường" },
      ],
    },
    {
      title: "4. Quy định ứng xử",
      items: [
        { text: "Tôn trọng các thành viên khác" },
        { text: "Hỗ trợ và giúp đỡ lẫn nhau" },
        { text: "Không có hành vi phân biệt đối xử" },
        { text: "Duy trì tinh thần tích cực và xây dựng" },
      ],
    },
  ];

  const financialPolicySectionIntro: SectionIntro = {
    tag: "Tài chính",
    title: "Chính sách tài chính",
    description:
      "Chúng tôi cam kết minh bạch và trách nhiệm trong việc quản lý tài chính, đảm bảo mọi khoản thu chi đều được sử dụng đúng mục đích và có báo cáo rõ ràng.",
  };

  const financialPolicySectionItems: SectionListTextItems[] = [
    {
      title: "Nguyên tắc thu chi",
      items: [
        { text: "Phí tham gia hoạt động được tính theo chi phí thực tế" },
        { text: "Không có lợi nhuận từ hoạt động cộng đồng" },
        { text: "Mọi khoản chi đều có hóa đơn và chứng từ" },
        { text: "Báo cáo tài chính công khai hàng tháng" },
      ],
    },
    {
      title: "Quản lý tài sản",
      items: [
        { text: "Trang thiết bị được quản lý và bảo quản cẩn thận" },
        { text: "Kiểm kê tài sản định kỳ hàng quý" },
        { text: "Bảo hiểm cho các hoạt động có rủi ro cao" },
        { text: "Dự phòng tài chính cho các tình huống khẩn cấp" },
      ],
    },
  ];

  const codeOfConductSectionIntro: SectionIntro = {
    tag: "Ứng xử",
    title: "Quy tắc ứng xử",
    description:
      "Bộ quy tắc ứng xử mà tất cả thành viên và tình nguyện viên phải tuân thủ",
  };

  const codeOfConductSectionItems: SectionIcon[] = [
    {
      icon: "fi flaticon-user",
      title: "Tôn trọng",
      description:
        "Tôn trọng sự đa dạng, quan điểm và quyền riêng tư của mọi thành viên. Không có hành vi phân biệt đối xử dựa trên giới tính, tuổi tác, tôn giáo hay xuất thân.",
    },
    {
      icon: "fi flaticon-checked",
      title: "Trung thực",
      description:
        "Luôn trung thực trong mọi hoạt động, báo cáo chính xác và minh bạch. Không che giấu thông tin quan trọng hoặc cung cấp thông tin sai lệch.",
    },
    {
      icon: "fi flaticon-forest",
      title: "Bảo vệ môi trường",
      description:
        'Cam kết bảo vệ môi trường trong mọi hoạt động. Tuân thủ nguyên tắc "không để lại dấu vết" và tích cực tham gia các hoạt động bảo vệ thiên nhiên.',
    },
  ];

  const contactPolicySectionIntro: SectionIntro = {
    tag: "Liên hệ",
    title: "Khiếu nại và góp ý",
    description:
      "Chúng tôi luôn lắng nghe và tiếp thu mọi ý kiến đóng góp từ thành viên. Mọi khiếu nại và góp ý đều được xử lý nghiêm túc và kịp thời.",
  };

  const contactPolicySectionItems: SectionListTextItems[] = [
    {
      title: "Quy trình xử lý",
      items: [
        { text: "Tiếp nhận khiếu nại trong vòng 24 giờ" },
        { text: "Điều tra và xác minh thông tin" },
        { text: "Phản hồi kết quả trong vòng 7 ngày" },
        { text: "Thực hiện các biện pháp khắc phục" },
      ],
    },
    {
      title: "Kênh liên hệ",
      items: [
        { text: "Email: banchanxanh.jp@gmail.com" },
        { text: "Facebook: facebook.com/banchanxanhjp" },
        { text: "Instagram: instagram.com/banchanxanh.kt" },
      ],
    },
  ];

  const policyContent: PolicyContent = {
    pageIntro: {
      tag: "Nguyên tắc và quy định",
      title: "Chính sách hoạt động",
      description:
        "Tổ chức Bàn Chân Xanh cam kết hoạt động theo các nguyên tắc minh bạch, trách nhiệm và bền vững. Dưới đây là các chính sách và quy định mà chúng tôi tuân thủ trong mọi hoạt động.",
    },
    missionVision,
    coreValuesSection: {
      sectionIntro: coreValuesSectionIntro,
      items: coreValueSectionItems,
    },
    activityPoliciesSection: {
      sectionIntro: activityPoliciesSectionIntro,
      items: activityPoliciesSectionItems,
    },
    financialPolicySection: {
      sectionIntro: financialPolicySectionIntro,
      items: financialPolicySectionItems,
    },
    codeOfConductSection: {
      sectionIntro: codeOfConductSectionIntro,
      items: codeOfConductSectionItems,
    },
    contactPolicySection: {
      sectionIntro: contactPolicySectionIntro,
      items: contactPolicySectionItems,
      button: {
        text: "Liên hệ với chúng tôi",
        link: "/contact",
      },
    },
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      policyContent,
    },
  };
};

const PolicyPage: React.FC<PolicyProps> = (props) => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [policyContent, setPolicyContent] = useState<PolicyContent | null>(
    null,
  );
  const [seoData] = useState<SEOProps | null>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const data = await globalService.get({ populate: "*" });
      setGlobalData(data);
    };

    const fetchPolicyContent = async () => {
      const data = await policyService.get({
        populate: {
          "populate[pageIntro][populate]": "*",
          "populate[missionVision][populate]": "*",
          "populate[coreValuesSection][populate]": "*",
          "populate[activityPoliciesSection][populate]": "*",
          "populate[financialPolicySection][populate]": "*",
          "populate[codeOfConductSection][populate]": "*",
          "populate[contactPolicySection][populate]": "*",
        },
      });
      setPolicyContent(data);
    };

    fetchGlobalData();
    fetchPolicyContent();
  }, []);

  const content = policyContent || props.policyContent;
  const layoutData = globalData
    ? convertGlobalInfoToLayoutData(globalData)
    : props.layout.data;

  return (
    <Layout data={layoutData}>
      <SEO {...(seoData || props.seo)} />

      {content.pageIntro && <PolicyIntro {...content.pageIntro} />}

      {content.missionVision && content.missionVision.length > 0 && (
        <PolicyMissionVision items={content.missionVision} />
      )}

      {content.coreValuesSection && (
        <PolicyCoreValues
          sectionIntro={content.coreValuesSection.sectionIntro}
          items={content.coreValuesSection.items}
        />
      )}

      {content.activityPoliciesSection && (
        <PolicyActivityPolicies
          sectionIntro={content.activityPoliciesSection.sectionIntro}
          items={content.activityPoliciesSection.items}
        />
      )}

      {content.financialPolicySection && (
        <PolicyFinancial
          sectionIntro={content.financialPolicySection.sectionIntro}
          items={content.financialPolicySection.items}
        />
      )}

      {content.codeOfConductSection && (
        <PolicyCodeOfConduct
          sectionIntro={content.codeOfConductSection.sectionIntro}
          items={content.codeOfConductSection.items}
        />
      )}

      {content.contactPolicySection && (
        <PolicyContact
          sectionIntro={content.contactPolicySection.sectionIntro}
          items={content.contactPolicySection.items}
          button={content.contactPolicySection.button}
        />
      )}
    </Layout>
  );
};

export default PolicyPage;
