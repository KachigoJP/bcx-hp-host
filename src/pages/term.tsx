import { globalService, seoService, termService } from "@/lib/strapi/services";
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import { GlobalInfo, LegalSection, TermContent } from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React, { useEffect, useState } from "react";

interface TermProps {
    layout: LayoutProps;
    seo: SEOProps;
    termContent: TermContent;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            page_code: "term",
            title: "Điều khoản sử dụng - Bàn Chân Xanh",
            description: "Điều khoản sử dụng website và dịch vụ của tổ chức Bàn Chân Xanh. Quy định về việc sử dụng website, tham gia hoạt động và đóng góp."
        }
    };

    const pageIntro = {
        tag: "Quy định sử dụng",
        title: "Điều khoản sử dụng",
        description: "Cập nhật lần cuối: 01/12/2024"
    };

    const termSections: LegalSection[] = [
        {
            title: "1. Giới thiệu",
            description: "Chào mừng bạn đến với website của Tổ chức Bàn Chân Xanh. Những điều khoản sử dụng này quy định việc bạn sử dụng website banchanxanh.org và các dịch vụ liên quan. Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng website."
        },
        {
            title: "2. Định nghĩa",
            description: "",
            items: [
                { text: "Website - Trang web banchanxanh.org và tất cả các trang con" },
                { text: "Dịch vụ - Tất cả các hoạt động, chương trình, workshop, sự kiện do Bàn Chân Xanh tổ chức" },
                { text: "Người dùng - Bất kỳ cá nhân hoặc tổ chức nào truy cập hoặc sử dụng website" },
                { text: "Nội dung - Tất cả thông tin, văn bản, hình ảnh, video trên website" },
                { text: "Đóng góp - Các khoản tài trợ, quyên góp cho tổ chức" }
            ]
        },
        {
            title: "3. Chấp nhận điều khoản",
            description: "Khi bạn truy cập, sử dụng website hoặc tham gia các hoạt động của chúng tôi, bạn xác nhận rằng:",
            items: [
                { text: "Bạn đã đọc, hiểu và đồng ý tuân thủ các điều khoản này" },
                { text: "Bạn có đủ năng lực pháp lý để tham gia các hoạt động" },
                { text: "Thông tin bạn cung cấp là chính xác và đầy đủ" },
                { text: "Bạn sẽ sử dụng website và dịch vụ một cách hợp pháp và có trách nhiệm" }
            ]
        },
        {
            title: "4. Sử dụng website",
            description: "",
            subsections: [
                {
                    title: "4.1. Quyền sử dụng",
                    description: "Chúng tôi cấp cho bạn quyền sử dụng website cho mục đích cá nhân, phi thương mại. Bạn có thể:",
                    items: [
                        { text: "Xem và đọc nội dung trên website" },
                        { text: "Tải xuống tài liệu được cung cấp miễn phí" },
                        { text: "Đăng ký tham gia các hoạt động" },
                        { text: "Liên hệ với chúng tôi qua các kênh được cung cấp" }
                    ]
                },
                {
                    title: "4.2. Hạn chế sử dụng",
                    description: "Bạn không được:",
                    items: [
                        { text: "Sử dụng website cho mục đích bất hợp pháp hoặc trái với quy định pháp luật" },
                        { text: "Can thiệp, phá hoại hoặc làm gián đoạn hoạt động của website" },
                        { text: "Thu thập thông tin cá nhân của người dùng khác" },
                        { text: "Phát tán virus, malware hoặc mã độc hại" },
                        { text: "Xâm phạm bản quyền, thương hiệu hoặc quyền sở hữu trí tuệ" },
                        { text: "Sử dụng website để gửi spam hoặc nội dung không phù hợp" }
                    ]
                }
            ]
        },
        {
            title: "5. Tham gia hoạt động",
            description: "",
            subsections: [
                {
                    title: "5.1. Đăng ký tham gia",
                    description: "Khi đăng ký tham gia các hoạt động của chúng tôi, bạn cần:",
                    items: [
                        { text: "Cung cấp thông tin chính xác và đầy đủ" },
                        { text: "Tuân thủ các quy định an toàn và hướng dẫn" },
                        { text: "Tham gia với tinh thần tích cực và xây dựng" },
                        { text: "Tôn trọng các thành viên khác và môi trường" }
                    ]
                },
                {
                    title: "5.2. Trách nhiệm cá nhân",
                    description: "Bạn chịu trách nhiệm:",
                    items: [
                        { text: "Đảm bảo sức khỏe phù hợp với hoạt động tham gia" },
                        { text: "Mang theo trang thiết bị cần thiết (nếu có yêu cầu)" },
                        { text: "Thông báo kịp thời nếu không thể tham gia" },
                        { text: "Bồi thường thiệt hại do hành vi cố ý hoặc thiếu trách nhiệm" }
                    ]
                }
            ]
        },
        {
            title: "6. Đóng góp và tài trợ",
            description: "",
            subsections: [
                {
                    title: "6.1. Quy định đóng góp",
                    description: "Khi thực hiện đóng góp cho tổ chức:",
                    items: [
                        { text: "Đóng góp phải được thực hiện tự nguyện" },
                        { text: "Chúng tôi cam kết sử dụng đúng mục đích đã công bố" },
                        { text: "Mọi đóng góp đều được ghi nhận và báo cáo minh bạch" },
                        { text: "Bạn có quyền yêu cầu báo cáo sử dụng nguồn đóng góp" }
                    ]
                },
                {
                    title: "6.2. Hoàn trả đóng góp",
                    description: "Trong các trường hợp sau, chúng tôi có thể xem xét hoàn trả đóng góp:",
                    items: [
                        { text: "Đóng góp được thực hiện do nhầm lẫn hoặc sai sót" },
                        { text: "Dự án được đóng góp không thể thực hiện do lý do bất khả kháng" },
                        { text: "Có yêu cầu hoàn trả trong vòng 7 ngày kể từ ngày đóng góp" }
                    ]
                }
            ]
        },
        {
            title: "7. Bảo mật thông tin",
            description: "Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo Chính sách bảo mật. Tuy nhiên, bạn cần lưu ý:",
            items: [
                { text: "Không chia sẻ thông tin đăng nhập với người khác" },
                { text: "Thông báo ngay nếu phát hiện vi phạm bảo mật" },
                { text: "Chúng tôi không chịu trách nhiệm về việc mất thông tin do lỗi của bạn" }
            ]
        },
        {
            title: "8. Sở hữu trí tuệ",
            description: "",
            subsections: [
                {
                    title: "8.1. Quyền sở hữu",
                    description: "Tất cả nội dung trên website, bao gồm nhưng không giới hạn: Văn bản, hình ảnh, video, âm thanh; Logo, thương hiệu, thiết kế; Phần mềm, mã nguồn, cơ sở dữ liệu. Đều thuộc quyền sở hữu của Bàn Chân Xanh hoặc được cấp phép sử dụng."
                },
                {
                    title: "8.2. Sử dụng nội dung",
                    description: "Bạn có thể: Chia sẻ liên kết đến website; Trích dẫn nội dung với ghi rõ nguồn; Sử dụng cho mục đích giáo dục, phi thương mại. Bạn không được: Sao chép, phân phối nội dung mà không có sự đồng ý; Sử dụng cho mục đích thương mại; Thay đổi hoặc xóa thông tin bản quyền."
                }
            ]
        },
        {
            title: "9. Miễn trừ trách nhiệm",
            description: "Chúng tôi cung cấp website và dịch vụ như hiện tại và không đảm bảo: Website hoạt động liên tục không gián đoạn; Không có lỗi hoặc virus; Nội dung luôn chính xác và cập nhật; Kết quả cụ thể từ việc sử dụng dịch vụ. Chúng tôi không chịu trách nhiệm về: Thiệt hại trực tiếp hoặc gián tiếp do sử dụng website; Mất dữ liệu, lợi nhuận hoặc cơ hội kinh doanh; Hành vi của người dùng khác; Nội dung của các website liên kết."
        },
        {
            title: "10. Chấm dứt sử dụng",
            description: "Chúng tôi có quyền chấm dứt hoặc hạn chế quyền sử dụng website của bạn nếu: Vi phạm các điều khoản này; Sử dụng website cho mục đích bất hợp pháp; Gây tổn hại đến hoạt động của tổ chức; Không tuân thủ các quy định an toàn. Bạn có thể chấm dứt sử dụng bất kỳ lúc nào bằng cách ngừng truy cập website."
        },
        {
            title: "11. Thay đổi điều khoản",
            description: "Chúng tôi có quyền cập nhật, thay đổi các điều khoản này bất kỳ lúc nào. Khi có thay đổi: Chúng tôi sẽ thông báo trên website; Ngày cập nhật sẽ được ghi rõ; Việc tiếp tục sử dụng được coi là chấp nhận điều khoản mới."
        },
        {
            title: "12. Giải quyết tranh chấp",
            description: "",
            subsections: [
                {
                    title: "12.1. Thương lượng",
                    description: "Mọi tranh chấp sẽ được giải quyết thông qua thương lượng hòa bình trước tiên."
                },
                {
                    title: "12.2. Trọng tài",
                    description: "Nếu không thể thương lượng, tranh chấp sẽ được giải quyết bằng trọng tài theo quy định của pháp luật Việt Nam."
                },
                {
                    title: "12.3. Luật áp dụng",
                    description: "Điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam."
                }
            ]
        },
        {
            title: "13. Liên hệ",
            description: "Nếu bạn có câu hỏi về các điều khoản này, vui lòng liên hệ:",
            contactInfo: {
                organization: "Tổ chức Bàn Chân Xanh",
                address: "123 Đường ABC, Quận XYZ, Hà Nội",
                email: "info@banchanxanh.org",
                phone: "0123456789",
                website: "banchanxanh.org"
            }
        },
        {
            title: "14. Hiệu lực",
            description: "Điều khoản này có hiệu lực từ ngày 01/12/2024 và thay thế cho tất cả các thỏa thuận trước đó liên quan đến việc sử dụng website và dịch vụ của Bàn Chân Xanh."
        }
    ];

    const termContent: TermContent = {
        pageIntro,
        sections: termSections
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            termContent,
        },
    };
};

const TermPage: React.FC<TermProps> = (props) => {
    const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
    const [termContent, setTermContent] = useState<TermContent | null>(null);
    const [seoData, setSeoData] = useState<SEOProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [globalResponse, termResponse, seoResponse] = await Promise.all([
                    globalService.get({
                        populate: "*",
                    }),
                    termService.get({
                        populate: {
                            pageIntro: true,
                            sections: {
                                populate: {
                                    items: true,
                                    subsections: {
                                        populate: {
                                            items: true
                                        }
                                    },
                                    contactInfo: true
                                }
                            }
                        }
                    }),
                    seoService.get({
                        populate: {
                            "populate[pages][populate]": "*",
                        },
                    })
                ]);

                setGlobalData(globalResponse);
                setTermContent(termResponse);
                setSeoData(seoResponse);
            } catch (error) {
                console.error('Error fetching term data:', error);
                setTermContent(props.termContent);
                setSeoData(props.seo);
            }
        };

        fetchData();
    }, [props.termContent, props.seo]);

    const pageIntro = termContent?.pageIntro || props.termContent.pageIntro;
    const sections = termContent?.sections || props.termContent.sections;

    const layoutData = globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data;

    return (
        <Layout data={layoutData}>
            <SEO {...(seoData || props.seo)} />

            <div className="term-page">
                {/* Term Content Section */}
                <section className="wpo-term-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="wpo-section-title text-center">
                                    <span>{pageIntro?.tag}</span>
                                    <h2>{pageIntro?.title}</h2>
                                    <p>{pageIntro?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-10 col-12 mx-auto">
                                <div className="terms-content">
                                    {sections?.map((section, index) => (
                                        <div key={index} className="terms-section">
                                            <h3>{section.title}</h3>
                                            {section.description && <p>{section.description}</p>}

                                            {section.items && section.items.length > 0 && (
                                                <ul>
                                                    {section.items.map((item, itemIndex) => (
                                                        <li key={itemIndex}>{item.text}</li>
                                                    ))}
                                                </ul>
                                            )}

                                            {section.subsections && section.subsections.length > 0 && (
                                                <>
                                                    {section.subsections.map((subsection, subIndex) => (
                                                        <div key={subIndex}>
                                                            <h4>{subsection.title}</h4>
                                                            {subsection.description && <p>{subsection.description}</p>}
                                                            {subsection.items && subsection.items.length > 0 && (
                                                                <ul>
                                                                    {subsection.items.map((item, itemIndex) => (
                                                                        <li key={itemIndex}>{item.text}</li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    ))}
                                                </>
                                            )}

                                            {section.contactInfo && (
                                                <div className="contact-info">
                                                    <p><strong>{section.contactInfo.organization}</strong></p>
                                                    <p>Địa chỉ: {section.contactInfo.address}</p>
                                                    <p>Email: {section.contactInfo.email}</p>
                                                    <p>Điện thoại: {section.contactInfo.phone}</p>
                                                    <p>Website: <a href="/">{section.contactInfo.website}</a></p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default TermPage;
