import React from "react";
import { SectionIntro } from "@/utils/interfaces";
import styles from "./DonateForm.module.scss";

export interface DonateFormProps {
    sectionIntro: SectionIntro;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DonateForm: React.FC<DonateFormProps> = ({ sectionIntro, onSubmit }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (onSubmit) {
            onSubmit(e);
            return;
        }
        e.preventDefault();
        const form = e.currentTarget;
        const submitButton = form.querySelector(`.${styles["submitButton"]}`) as HTMLButtonElement;

        if (submitButton) {
            submitButton.classList.add(styles["loading"]);
            submitButton.disabled = true;
        }

        setTimeout(() => {
            if (submitButton) {
                submitButton.classList.remove(styles["loading"]);
                submitButton.disabled = false;
            }
            form.classList.add(styles["success"]);
            setTimeout(() => {
                form.classList.remove(styles["success"]);
                form.reset();
            }, 3000);
        }, 2000);
    };

    return (
        <section className={`${styles["wpo-donation-form-section"]} section-padding`}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className={styles["wpo-form-text"]}>
                            <div className="wpo-section-title">
                                <span>{sectionIntro.tag}</span>
                                <h2>{sectionIntro.title}</h2>
                                <p>{sectionIntro.description}</p>
                            </div>
                            <div className={styles["donation-benefits"]}>
                                <h4>Lợi ích khi đóng góp:</h4>
                                <ul>
                                    <li><i className="flaticon-checked"></i> Giấy chứng nhận đóng góp</li>
                                    <li><i className="flaticon-checked"></i> Báo cáo sử dụng nguồn đóng góp</li>
                                    <li><i className="flaticon-checked"></i> Cập nhật tiến độ dự án</li>
                                    <li><i className="flaticon-checked"></i> Tham gia sự kiện đặc biệt</li>
                                    <li><i className="flaticon-checked"></i> Giảm thuế thu nhập cá nhân</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className={styles["wpo-join-form"]}>
                            <div className={styles["donateFormTitle"]}>
                                <h3>Đóng góp ngay</h3>
                                <p>Điền thông tin để chúng tôi có thể gửi giấy chứng nhận và báo cáo sử dụng nguồn đóng góp.</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className={styles["formGroup"]}>
                                            <label>Họ và tên <span>*</span></label>
                                            <input type="text" className={styles["formControl"]} placeholder="Nhập họ và tên của bạn" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className={styles["formGroup"]}>
                                            <label>Email <span>*</span></label>
                                            <input type="email" className={styles["formControl"]} placeholder="example@email.com" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className={styles["formGroup"]}>
                                            <label>Số điện thoại <span>*</span></label>
                                            <input type="tel" className={styles["formControl"]} placeholder="0901234567" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className={styles["formGroup"]}>
                                            <label>Số tiền đóng góp <span>*</span></label>
                                            <input type="number" className={styles["formControl"]} placeholder="100000" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className={styles["formGroup"]}>
                                            <label>Mục đích đóng góp <span>*</span></label>
                                            <select className={styles["formControl"]} required>
                                                <option value="">Chọn mục đích đóng góp</option>
                                                <option value="tree">Trồng cây xanh</option>
                                                <option value="education">Giáo dục môi trường</option>
                                                <option value="cleanup">Dọn dẹp môi trường</option>
                                                <option value="research">Nghiên cứu môi trường</option>
                                                <option value="general">Đóng góp chung</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className={styles["formGroup"]}>
                                            <label>Phương thức đóng góp <span>*</span></label>
                                            <select className={styles["formControl"]} required>
                                                <option value="">Chọn phương thức đóng góp</option>
                                                <option value="bank">Chuyển khoản ngân hàng</option>
                                                <option value="momo">Ví điện tử MoMo</option>
                                                <option value="zalopay">Ví điện tử ZaloPay</option>
                                                <option value="cash">Đóng góp trực tiếp</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className={styles["formGroup"]}>
                                            <label>Lời nhắn</label>
                                            <textarea className={styles["formControl"]} rows={4} placeholder="Lời nhắn của bạn (tùy chọn)"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className={styles["formCheck"]}>
                                            <input type="checkbox" id="agree-donate" required />
                                            <label htmlFor="agree-donate">
                                                Tôi đồng ý với <a href="/term">Điều khoản sử dụng</a> và <a href="/privacy">Chính sách bảo mật</a> <span>*</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className={`${styles["formGroup"]} text-center`}>
                                            <button type="submit" className={styles["submitButton"]}>
                                                <span>Xác nhận đóng góp</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className={styles["security-note"]}>
                                <i className="ti-shield"></i>
                                Thông tin của bạn được bảo mật tuyệt đối
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonateForm;
