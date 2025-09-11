import { ImagePresets, OptimizedImage } from '@utils/imageUtils';
import Link from 'next/link';
import React from 'react';
import erimg from '/public/images/error-404.png';

const Error: React.FC = () => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    return (
        <section className="error-404-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="content clearfix">
                            <div className="error">
                                <OptimizedImage
                                    src={erimg}
                                    alt="Lỗi 404 - Không tìm thấy trang"
                                    {...ImagePresets.error}
                                />
                            </div>
                            <div className="error-message">
                                <h3>Ôi! Không tìm thấy trang!</h3>
                                <p>Xin lỗi, chúng tôi không thể tìm thấy trang bạn yêu cầu. Điều này có thể do bạn đã nhập sai địa chỉ web.</p>
                                <Link onClick={ClickHandler} href="/" className="theme-btn">Về trang chủ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Error;
