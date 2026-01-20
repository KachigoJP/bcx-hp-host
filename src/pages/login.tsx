import { globalService } from "@/lib/strapi/services";
// import { seoService } from "@/lib/strapi/services"; // SEO content type not created yet
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import { GlobalInfo, LoginContent } from "@/utils/interfaces";
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

interface LoginProps {
    layout: LayoutProps;
    seo: SEOProps;
    loginContent: LoginContent;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            page_code: "login",
            title: "Đăng nhập - Bàn Chân Xanh",
            description: "Đăng nhập vào hệ thống Bàn Chân Xanh",
        },
    };

    const loginContent: LoginContent = {
        pageIntro: {
            tag: "Chào mừng trở lại",
            title: "Đăng nhập",
            description: "Đăng nhập để tiếp tục tham gia các hoạt động của Bàn Chân Xanh"
        },
        forgotPassword: {
            text: "Quên mật khẩu",
            link: "/forgot-password"
        },
        register: {
            text: "Đăng ký",
            link: "/register"
        },
        notAcountText: "Chưa có tài khoản? ",
        registeringText: "Đang đăng nhập...",
        rememberMeText: "Ghi nhớ đăng nhập",
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            loginContent,
        },
    };
};

const LoginPage: React.FC<LoginProps> = (props) => {
    const router = useRouter();
    const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
    const [loginContent, setLoginContent] = useState<LoginContent | null>(null);
    const [seoData] = useState<SEOProps | null>(null);
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        identifier: "",
        password: "",
        general: "",
    });
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [globalResponse, loginResponse, seoResponse] = await Promise.all([
                    globalService.get({
                        populate: "*",
                    }),
                    loginService.get({
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
                setLoginContent(loginResponse);
                setSeoData(seoResponse);
            } catch (error) {
                console.error('Error fetching login data:', error);
                setLoginContent(props.loginContent);
                setSeoData(props.seo);
            }
        };

        fetchData();
    }, [props.loginContent, props.seo]);

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
            identifier: "",
            password: "",
            general: "",
        };
        let isValid = true;

        // Validate identifier (email or username)
        if (!formData.identifier.trim()) {
            newErrors.identifier = "Vui lòng nhập email hoặc tên đăng nhập";
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

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({
            identifier: "",
            password: "",
            general: "",
        });

        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await authService.login({
                identifier: formData.identifier,
                password: formData.password,
            });

            // Success
            try {
                toast.success(`Chào mừng bạn trở lại, ${response.user.username}!`);
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
            if (strapiError.message?.toLowerCase().includes("invalid")) {
                setErrors((prev) => ({
                    ...prev,
                    general: "Email/tên đăng nhập hoặc mật khẩu không đúng",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    general: strapiError.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
                }));
            }

            try {
                toast.error(strapiError.message || "Đăng nhập thất bại");
            } catch (toastError) {
                console.error("Toast error:", toastError);
            }
        } finally {
            setLoading(false);
        }
    };

    const layoutData = globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data;
    const pageIntro = loginContent?.pageIntro || props.loginContent.pageIntro;
    const forgotPassword = loginContent?.forgotPassword || props.loginContent.forgotPassword;
    const register = loginContent?.register || props.loginContent.register;
    const notAcountText = loginContent?.notAcountText || props.loginContent.notAcountText;
    const registeringText = loginContent?.registeringText || props.loginContent.registeringText;
    const rememberMeText = loginContent?.rememberMeText || props.loginContent.rememberMeText;

    return (
        <Layout data={layoutData}>
            <SEO {...(seoData || props.seo)} />

            {/* Login Section */}
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
                                            name="identifier"
                                            placeholder="Email hoặc tên đăng nhập *"
                                            value={formData.identifier}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                        {errors.identifier && (
                                            <span className="errorMessage">{errors.identifier}</span>
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

                                    <div className="check-box-wrap">
                                        <div className="check-box">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                            />
                                            <label htmlFor="remember">{rememberMeText}</label>
                                        </div>
                                        <div className="forget-btn">
                                            <Link href={forgotPassword?.link || "/#"} style={{ color: "#ef5f34", fontWeight: "600" }}>
                                                {forgotPassword?.text}
                                            </Link>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="theme-btn"
                                        disabled={loading}
                                        style={{ width: "100%", marginTop: "20px" }}
                                    >
                                        {loading ? registeringText : register?.text}
                                    </button>
                                </form>

                                <p style={{ textAlign: "center", marginTop: "30px" }}>
                                    {notAcountText}{" "}
                                    <Link href={register?.link || "/#"} style={{ color: "#ef5f34", fontWeight: "600" }}>
                                        {register?.text}
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

export default LoginPage;

