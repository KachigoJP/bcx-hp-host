import globalService from "@/lib/strapi/services/globalService";
import reportService from "@/lib/strapi/services/reportService";
import seoService from "@/lib/strapi/services/seoService";
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import {
  BaseDetail,
  FinancialSummary,
  GlobalInfo,
  MonthlyReportItem,
  ReportContent,
  SectionIcon,
  SectionIconNumber,
  SectionIntro
} from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React, { useEffect, useRef, useState } from "react";

interface ReportProps {
  layout: LayoutProps;
  seo: SEOProps;
  reportContent: ReportContent;
}

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      page_code: "report",
      title: "Báo cáo hoạt động - Bàn Chân Xanh",
      description: "Báo cáo hoạt động và tài chính của tổ chức Bàn Chân Xanh",
    },
  };

  const statistics: SectionIconNumber[] = [
    {
      icon: "fi flaticon-forest",
      number: "24",
      title: "Hoạt động Hiking",
      description: "Tổ chức 24 chuyến hiking với 480 lượt tham gia",
    },
    {
      icon: "fi flaticon-placeholder",
      number: "12",
      title: "Hoạt động Camping",
      description: "Tổ chức 12 chuyến camping với 240 lượt tham gia",
    },
    {
      icon: "fi flaticon-graduation-cap",
      number: "8",
      title: "Workshop",
      description: "Tổ chức 8 workshop với 160 lượt tham gia",
    },
    {
      icon: "fi flaticon-user",
      number: "880",
      title: "Tổng lượt tham gia",
      description: "Tổng cộng 880 lượt tham gia các hoạt động",
    },
  ];

  const monthlyReportSectionIntro: SectionIntro = {
    tag: "Báo cáo hàng tháng",
    title: "Báo cáo chi tiết theo tháng",
    description: "Xem chi tiết các hoạt động và kết quả đạt được trong từng tháng",
  };

  const reportItems: MonthlyReportItem[] = [
    {
      month: "Tháng 12/2024",
      date: "15/12/2024",
      activities: [
        { text: "3 hoạt động hiking tại Núi Takao" },
        { text: "1 hoạt động camping tại Lake Kawaguchi" },
        { text: "1 workshop về kỹ năng sinh tồn" },
        { text: "120 lượt tham gia" },
      ],
      participants: "120 lượt tham gia",
      downloadLink: "#",
    },
    {
      month: "Tháng 11/2024",
      date: "15/11/2024",
      activities: [
        { text: "2 hoạt động hiking tại Núi Fuji" },
        { text: "2 hoạt động camping tại Hakone" },
        { text: "1 workshop về bảo vệ môi trường" },
        { text: "95 lượt tham gia" },
      ],
      participants: "95 lượt tham gia",
      downloadLink: "#",
    },
    {
      month: "Tháng 10/2024",
      date: "15/10/2024",
      activities: [
        { text: "4 hoạt động hiking tại Nikko" },
        { text: "1 hoạt động camping tại Lake Chuzenji" },
        { text: "1 workshop về văn hóa Nhật Bản" },
        { text: "110 lượt tham gia" },
      ],
      participants: "110 lượt tham gia",
      downloadLink: "#",
    },
  ];

  const annualReportSectionIntro: SectionIntro = {
    tag: "Báo cáo năm",
    title: "Báo cáo tổng kết năm 2024",
    description:
      "Báo cáo tổng kết toàn diện về hoạt động, thành tựu và tác động của tổ chức Bàn Chân Xanh trong năm 2024.",
  };

  const annualReportHighlight: BaseDetail[] = [
    {
      title: "44 Hoạt động",
      description: "Tổ chức 44 hoạt động đa dạng trong năm",
    },
    {
      title: "880 Lượt tham gia",
      description: "Tổng cộng 880 lượt tham gia các hoạt động",
    },
    {
      title: "15 Tỉnh thành",
      description: "Hoạt động tại 15 tỉnh thành khác nhau",
    },
    {
      title: "95% Hài lòng",
      description: "Tỷ lệ hài lòng của thành viên đạt 95%",
    },
  ];

  const impactReportSectionIntro: SectionIntro = {
    tag: "Tác động",
    title: "Báo cáo tác động cộng đồng",
    description: "Đánh giá tác động tích cực của các hoạt động đến cộng đồng và môi trường",
  };

  const impactItems: SectionIcon[] = [
    {
      icon: "fi flaticon-user",
      title: "Tác động xã hội",
      description:
        "Kết nối hơn 500 thành viên, tạo môi trường giao lưu và học hỏi giữa cộng đồng người Việt tại Nhật Bản.",
    },
    {
      icon: "fi flaticon-forest",
      title: "Tác động môi trường",
      description:
        "Tổ chức các hoạt động dọn dẹp rác thải, giáo dục bảo vệ môi trường và phát triển ý thức bảo tồn thiên nhiên.",
    },
    {
      icon: "fi flaticon-graduation-cap",
      title: "Tác động giáo dục",
      description:
        "Cung cấp kiến thức về kỹ năng sinh tồn, văn hóa Nhật Bản và phát triển kỹ năng mềm cho thành viên.",
    },
  ];

  const financialReportSectionIntro: SectionIntro = {
    tag: "Tài chính",
    title: "Báo cáo tài chính minh bạch",
    description:
      "Chúng tôi cam kết minh bạch trong việc quản lý và sử dụng tài chính, đảm bảo mọi đồng tiền đều được sử dụng hiệu quả cho mục đích cộng đồng.",
  };

  const financialSummary: FinancialSummary = {
    income: {
      title: "Thu nhập",
      items: [
        { label: "Phí tham gia hoạt động", amount: "8,800,000 JPY" },
        { label: "Đóng góp từ thành viên", amount: "2,200,000 JPY" },
        { label: "Tổng thu", amount: "11,000,000 JPY" },
      ],
    },
    expenses: {
      title: "Chi phí",
      items: [
        { label: "Chi phí tổ chức hoạt động", amount: "7,700,000 JPY" },
        { label: "Chi phí quản lý", amount: "1,100,000 JPY" },
        { label: "Tổng chi", amount: "8,800,000 JPY" },
      ],
    },
    result: {
      label: "Lợi nhuận để tái đầu tư",
      amount: "2,200,000 JPY",
      percentage: "20%",
    },
    downloadLink: "#",
  };

  const reportContent: ReportContent = {
    pageIntro: {
      tag: "Minh bạch và trách nhiệm",
      title: "Báo cáo hoạt động",
      description:
        "Chúng tôi cam kết minh bạch trong mọi hoạt động và thường xuyên cập nhật các báo cáo chi tiết về tình hình hoạt động, kết quả đạt được và tác động tích cực đến cộng đồng.",
    },
    statistics,
    monthlyReportSection: {
      sectionIntro: monthlyReportSectionIntro,
      items: reportItems,
    },
    annualReportSection: {
      sectionIntro: annualReportSectionIntro,
      items: annualReportHighlight,
      downloadLink: "#",
    },
    impactReportSection: {
      sectionIntro: impactReportSectionIntro,
      items: impactItems,
    },
    financialReportSection: {
      sectionIntro: financialReportSectionIntro,
      financialSummary,
    },
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      reportContent,
    },
  };
};

const ReportPage: React.FC<ReportProps> = props => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [reportContent, setReportContent] = useState<ReportContent | null>(null);
  const [seoData, setSeoData] = useState<SEOProps | null>(null);
  const statisticsRef = useRef<HTMLDivElement>(null);
  const monthlyReportsRef = useRef<HTMLDivElement>(null);
  const annualReportsRef = useRef<HTMLDivElement>(null);
  const impactReportsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const globalData = await globalService.get({
        populate: {
          "populate[logo][populate]": "*",
          "populate[headerMenus][populate]": "*",
          "populate[rightButtons][populate]": "*",
          "populate[footerMenus][populate]": "*",
          "populate[footerQuicklinks][populate]": "*",
        },
      });
      setGlobalData(globalData);
    };
    const fetchReportContent = async () => {
      const reportContent = await reportService.get({
        populate: {
          "populate[pageIntro][populate]": "*",
          "populate[statistics][populate]": "*",
          "populate[monthlyReportSection][populate]": "*",
          "populate[annualReportSection][populate]": "*",
          "populate[impactReportSection][populate]": "*",
          "populate[financialReportSection][populate]": "*",
        },
      });
      setReportContent(reportContent);
    };
    const fetchSeoData = async () => {
      const seoData = await seoService.get({
        populate: {
          "populate[pages][populate]": "*",
        },
      });
      setSeoData(seoData);
    };
    fetchGlobalData();
    fetchReportContent();
    fetchSeoData();
  }, []);

  useEffect(() => {
    // Statistics animation observer
    const statisticsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Monthly reports animation observer
    const monthlyReportsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Annual reports animation observer
    const annualReportsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Impact reports animation observer
    const impactReportsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe statistics
    if (statisticsRef.current) {
      const statItems = statisticsRef.current.querySelectorAll(".wpo-stat-item");
      statItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.15}s`;
        statisticsObserver.observe(item);
      });
    }

    // Observe monthly reports
    if (monthlyReportsRef.current) {
      const reportItems = monthlyReportsRef.current.querySelectorAll(".wpo-report-item");
      reportItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        monthlyReportsObserver.observe(item);
      });
    }

    // Observe annual reports
    if (annualReportsRef.current) {
      const highlightItems = annualReportsRef.current.querySelectorAll(".wpo-highlight-item");
      highlightItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        annualReportsObserver.observe(item);
      });
    }

    // Observe impact reports
    if (impactReportsRef.current) {
      const impactItems = impactReportsRef.current.querySelectorAll(".wpo-impact-item");
      impactItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        impactReportsObserver.observe(item);
      });
    }

    return () => {
      statisticsObserver.disconnect();
      monthlyReportsObserver.disconnect();
      annualReportsObserver.disconnect();
      impactReportsObserver.disconnect();
    };
  }, [reportContent, props.reportContent]);

  const pageIntro = reportContent?.pageIntro || props.reportContent.pageIntro;
  const statistics = reportContent?.statistics || props.reportContent.statistics;
  const monthlyReportSection = reportContent?.monthlyReportSection || props.reportContent.monthlyReportSection;
  const annualReportSection = reportContent?.annualReportSection || props.reportContent.annualReportSection;
  const impactReportSection = reportContent?.impactReportSection || props.reportContent.impactReportSection;
  const financialReportSection = reportContent?.financialReportSection || props.reportContent.financialReportSection;

  return (
    <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data}>
      <SEO {...(seoData || props.seo)} />

      {/* Report Intro Section */}
      <section className="wpo-report-intro-section section-padding section-padding-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="wpo-section-title text-center">
                <span>{pageIntro?.tag}</span>
                <h2>{pageIntro?.title}</h2>
                <p>{pageIntro?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="wpo-statistics-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>Thống kê</span>
                <h2>Số liệu hoạt động năm 2024</h2>
                <p>Tổng hợp các số liệu và thống kê về hoạt động của tổ chức trong năm 2024</p>
              </div>
            </div>
          </div>
          <div className="row" ref={statisticsRef}>
            {statistics &&
              statistics.length > 0 &&
              statistics.map((stat, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-12">
                  <div className="wpo-stat-item text-center">
                    <div className="wpo-stat-icon">
                      <i className={stat.icon}></i>
                    </div>
                    <h3>{stat.number}</h3>
                    <h4>{stat.title}</h4>
                    <p>{stat.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Monthly Report Section */}
      <section className="wpo-monthly-report-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>
                  {
                    monthlyReportSection?.sectionIntro?.tag
                  }
                </span>
                <h2>
                  {
                    monthlyReportSection?.sectionIntro?.title
                  }
                </h2>
                <p>
                  {
                    monthlyReportSection?.sectionIntro?.description
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="row" ref={monthlyReportsRef}>
            {monthlyReportSection?.items.map((report, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12">
                <div className="wpo-report-item">
                  <div className="wpo-report-header">
                    <h4>{report.month || ""}</h4>
                    <span className="wpo-report-date">{report.date || ""}</span>
                  </div>
                  <div className="wpo-report-content">
                    <ul>
                      {report.activities.map((activity, activityIndex) => (
                        <li key={activityIndex}>{activity.text || ""}</li>
                      ))}
                    </ul>
                    <div className="wpo-report-download">
                      <a href={report.downloadLink || ""} className="theme-btn-s2">
                        Tải báo cáo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Report Section */}
      <section className="wpo-annual-report-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="wpo-annual-report-content text-center">
                <div className="wpo-section-title">
                  <span>
                    {
                      annualReportSection?.sectionIntro?.tag
                    }
                  </span>
                  <h2>
                    {
                      annualReportSection?.sectionIntro?.title
                    }
                  </h2>
                  <p>
                    {
                      annualReportSection?.sectionIntro?.description
                    }
                  </p>
                </div>
                <div className="wpo-annual-report-highlights" ref={annualReportsRef}>
                  <div className="row">
                    {annualReportSection?.items.map((highlight, index) => (
                      <div key={index} className="col-lg-6 col-md-6 col-12">
                        <div className="wpo-highlight-item">
                          <h4>{highlight.title || ""}</h4>
                          <p>{highlight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="wpo-annual-report-download">
                  <a
                    href={
                      annualReportSection?.downloadLink || ""
                    }
                    className="theme-btn"
                  >
                    Tải báo cáo năm 2024
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Report Section */}
      <section className="wpo-impact-report-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>
                  {
                    impactReportSection?.sectionIntro?.tag
                  }
                </span>
                <h2>
                  {
                    impactReportSection?.sectionIntro?.title
                  }
                </h2>
                <p>
                  {
                    impactReportSection?.sectionIntro?.description
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="row" ref={impactReportsRef}>
            {impactReportSection?.items.map((impact, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12">
                <div className="wpo-impact-item text-center">
                  <div className="wpo-impact-icon">
                    <i className={impact.icon}></i>
                  </div>
                  <h4>{impact.title || ""}</h4>
                  <p>{impact.description || ""}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Report Section */}
      <section className="wpo-financial-report-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="wpo-financial-report-content text-center">
                <div className="wpo-section-title">
                  <span>
                    {
                      financialReportSection?.sectionIntro?.tag
                    }
                  </span>
                  <h2>
                    {
                      financialReportSection?.sectionIntro?.title
                    }
                  </h2>
                  <p>
                    {
                      financialReportSection?.sectionIntro?.description
                    }
                  </p>
                </div>
                <div className="wpo-financial-summary">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="wpo-financial-item">
                        <h4>
                          {
                            financialReportSection?.financialSummary?.income?.title
                          }
                        </h4>
                        {
                          financialReportSection?.financialSummary?.income?.items &&
                          financialReportSection?.financialSummary?.income?.items.length > 0 &&
                          financialReportSection?.financialSummary?.income?.items.map((item, index) => (
                            <p key={index}>
                              {item.label}: {item.amount}
                            </p>
                          ))
                        }
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="wpo-financial-item">
                        <h4>
                          {
                            financialReportSection?.financialSummary?.expenses?.title
                          }
                        </h4>
                        {
                          financialReportSection?.financialSummary?.expenses?.items &&
                          financialReportSection?.financialSummary?.expenses?.items.length > 0 &&
                          financialReportSection?.financialSummary?.expenses?.items.map((item, index) => (
                            <p key={index}>
                              {item.label}: {item.amount}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="wpo-financial-result">
                    <h4>Kết quả tài chính</h4>
                    <p>
                      {
                        financialReportSection?.financialSummary?.result?.label
                      }
                      :{" "}
                      {
                        financialReportSection?.financialSummary?.result?.amount
                      }{" "}
                      (
                      {
                        financialReportSection?.financialSummary?.result?.percentage
                      }
                      )
                    </p>
                  </div>
                </div>
                <div className="wpo-financial-report-download">
                  <a
                    href={
                      financialReportSection?.financialSummary?.downloadLink
                    }
                    className="theme-btn-s2"
                  >
                    Tải báo cáo tài chính
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReportPage;
