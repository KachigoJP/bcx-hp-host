import { globalService } from "@/lib/strapi/services";
// import { seoService } from "@/lib/strapi/services"; // SEO content type not created yet
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import { GlobalInfo, RegisterContent } from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { authService } from "@/lib/strapi/services";
import { StrapiError } from "@utils/interfaces/strapi_types";
import { getDefaultLayoutData } from "@utils/layoutData";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface RegisterProps {
    layout: LayoutProps;
    seo: SEOProps;
    registerContent: RegisterContent;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            page_code: "register",
            title: "Đăng ký - Bàn Chân Xanh",
            description: "Đăng ký tài khoản để tham gia cộng đồng Bàn Chân Xanh",
        },
    };

    const registerContent: RegisterContent = {
        pageIntro: {
            tag: "Tạo tài khoản",
            title: "Đăng ký tài khoản",
            description: "Tạo tài khoản mới để tham gia cộng đồng Bàn Chân Xanh"
        },
        benefits: [
            {
                title: "Tham gia hoạt động",
                description: "Đăng ký và tham gia các hoạt động hiking, camping, workshop",
                icon: "flaticon-forest"
            },
            {
                title: "Kết nối cộng đồng",
                description: "Gặp gỡ và kết bạn với những người cùng sở thích",
                icon: "flaticon-user"
            },
            {
                title: "Nhận thông báo",
                description: "Cập nhật thông tin về các sự kiện và hoạt động mới",
                icon: "flaticon-calendar"
            },
            {
                title: "Ưu đãi đặc biệt",
                description: "Nhận các ưu đãi và giảm giá dành riêng cho thành viên",
                icon: "flaticon-checked"
            }
        ],
        termsLink: "/term",
        privacyLink: "/privacy",
        loginLink: "/login"
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            registerContent,
        },
    };
};

const RegisterPage: React.FC<RegisterProps> = (props) => {
    const router = useRouter();
    const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
    const [registerContent, setRegisterContent] = useState<RegisterContent | null>(null);
    const [seoData] = useState<SEOProps | null>(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        general: "",
    });
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [globalResponse, registerResponse, seoResponse] = await Promise.all([
                    globalService.get({
                        populate: "*",
                    }),
                    registerService.get({
                        populate: {
                            pageIntro: true,
                            benefits: true
                        }
                    }),
                    seoService.get({
                        populate: {
                            "populate[pages][populate]": "*",
                        },
                    })
                ]);

                setGlobalData(globalResponse);
                setRegisterContent(registerResponse);
                setSeoData(seoResponse);
            } catch (error) {
                console.error('Error fetching register data:', error);
                setRegisterContent(props.registerContent);
                setSeoData(props.seo);
            }
        };

        fetchData();
    }, [props.registerContent, props.seo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            general: "",
        };
        let isValid = true;

        // Validate username
        if (!formData.username.trim()) {
            newErrors.username = "Vui lòng nhập tên đăng nhập";
            isValid = false;
        } else if (formData.username.length < 3) {
            newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới";
            isValid = false;
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập email";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
            isValid = false;
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = "Vui lòng nhập mật khẩu";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            isValid = false;
        }

        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
            isValid = false;
        }

        // Validate terms acceptance
        if (!acceptTerms) {
            newErrors.general = "Bạn phải đồng ý với điều khoản sử dụng";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            general: "",
        });

        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await authService.register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            // Success
            try {
                toast.success(`Chào mừng ${response.user.username} đến với Bàn Chân Xanh!`);
            } catch (toastError) {
                console.error("Toast error:", toastError);
            }

            // Redirect to home page after 1 second
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (error) {
            const strapiError = error as StrapiError;

            // Handle specific errors
            if (strapiError.message?.toLowerCase().includes("email")) {
                setErrors((prev) => ({
                    ...prev,
                    email: "Email này đã được sử dụng",
                }));
            } else if (strapiError.message?.toLowerCase().includes("username")) {
                setErrors((prev) => ({
                    ...prev,
                    username: "Tên đăng nhập này đã được sử dụng",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    general: strapiError.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
                }));
            }

            try {
                toast.error(strapiError.message || "Đăng ký thất bại");
            } catch (toastError) {
                console.error("Toast error:", toastError);
            }
        } finally {
            setLoading(false);
        }
    };

    const pageIntro = registerContent?.pageIntro || props.registerContent.pageIntro;
    const termsLink = registerContent?.termsLink || props.registerContent.termsLink || "/#";
    const privacyLink = registerContent?.privacyLink || props.registerContent.privacyLink || "/#";
    const loginLink = registerContent?.loginLink || props.registerContent.loginLink || "/#";

    const layoutData = globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data;

    return (
        <Layout data={layoutData}>
            <SEO {...(seoData || props.seo)} />

            {/* Register Section */}
            <section className="wpo-contact-pg-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 col-12">
                            <div className="wpo-accountInfo">
                                <div className="fromTitle">
                                    <h2>{pageIntro?.title}</h2>
                                    <p>{pageIntro?.description}</p>
                                </div>

                                {errors.general && (
                                    <div className="alert alert-danger" role="alert">
                                        {errors.general}
                                    </div>
                                )}

                                <form className="form-style" onSubmit={handleSubmit}>
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Tên đăng nhập *"
                                            value={formData.username}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                        {errors.username && (
                                            <span className="errorMessage">{errors.username}</span>
                                        )}
                                    </div>

                                    <div className="form-field">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email *"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                        {errors.email && (
                                            <span className="errorMessage">{errors.email}</span>
                                        )}
                                    </div>

                                    <div className="form-field">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Mật khẩu *"
                                            value={formData.password}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                        {errors.password && (
                                            <span className="errorMessage">{errors.password}</span>
                                        )}
                                    </div>

                                    <div className="form-field">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Xác nhận mật khẩu *"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                        {errors.confirmPassword && (
                                            <span className="errorMessage">{errors.confirmPassword}</span>
                                        )}
                                    </div>

                                    <div className="check-box-wrap" style={{ marginTop: "20px" }}>
                                        <div className="check-box">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                checked={acceptTerms}
                                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                            />
                                            <label htmlFor="terms">
                                                Tôi đồng ý với{" "}
                                                <Link href={termsLink} target="_blank">
                                                    điều khoản sử dụng
                                                </Link>{" "}
                                                và{" "}
                                                <Link href={privacyLink} target="_blank">
                                                    chính sách bảo mật
                                                </Link>
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="theme-btn"
                                        disabled={loading}
                                        style={{ width: "100%", marginTop: "20px" }}
                                    >
                                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                                    </button>
                                </form>

                                <p style={{ textAlign: "center", marginTop: "30px" }}>
                                    Đã có tài khoản?{" "}
                                    <Link href={loginLink} style={{ color: "#ef5f34", fontWeight: "600" }}>
                                        Đăng nhập ngay
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default RegisterPage;

