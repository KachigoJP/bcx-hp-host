import { IMenuItem } from "@utils/interfaces/index.jsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface FooterData {
  logo: string;
  footerSlogan: string;
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
  google: string;
  footerQuicklinksTitle: string;
  footerQuicklinks: IMenuItem[];
  footerMenusTitle: string;
  footerMenus: IMenuItem[];
  footerContactTitle: string;
  footerContactDescription: string;
}

interface FooterProps {
  data: FooterData;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <footer className="wpo-site-footer">
      <div className="wpo-upper-footer">
        <div className="container">
          <div className="row">
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <Image src={data.logo} alt="blog" width={178} height={58} />
                </div>
                <p>{data.footerSlogan}</p>
                <ul>
                  {data.facebook && (
                    <li>
                      <Link href={data.facebook}>
                        <i className="ti-facebook"></i>
                      </Link>
                    </li>
                  )}
                  {data.instagram && (
                    <li>
                      <Link href={data.instagram}>
                        <i className="ti-instagram"></i>
                      </Link>
                    </li>
                  )}
                  {data.google && (
                    <li>
                      <Link href={data.google}>
                        <i className="ti-google"></i>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>{data.footerMenusTitle}</h3>
                </div>
                <ul>
                  {data.footerMenus && data.footerMenus.length > 0 && data.footerMenus.map((item, i) => (
                    <li key={i}>
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>{data.footerQuicklinksTitle}</h3>
                </div>
                <ul>
                  {data.footerQuicklinks && data.footerQuicklinks.length > 0 && data.footerQuicklinks.map((item, i) => (
                    <li key={i}>
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget wpo-service-link-widget">
                <div className="widget-title">
                  <h3>{data.footerContactTitle}</h3>
                </div>
                <div className="contact-ft">
                  <p>
                    {data.footerContactDescription}
                  </p>
                  <ul>
                    <li>
                      <i className="fi flaticon-mail"></i>
                      {data.email}
                    </li>
                    <li>
                      <i className="fi flaticon-phone-call"></i>
                      {data.phone}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wpo-lower-footer">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <p className="copyright">
                {" "}
                &copy; 2025 Bàn Chân Xanh. Tất cả quyền được bảo lưu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
