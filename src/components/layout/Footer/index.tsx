import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { IMenuItem } from "@utils/interfaces/index.jsx";

export interface FooterData {
  logo: string;
  footerSlogan: string;
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
  google: string;
  quicklinks: IMenuItem[];
  menus: IMenuItem[];
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
                  <li>
                    <Link href={data.facebook}>
                      <i className="ti-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={data.instagram}>
                      <i className="ti-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={data.google}>
                      <i className="ti-google"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>Latest News</h3>
                </div>
                <ul>
                  {data.menus.map((item, i) => (
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
                  <h3>Quick Links</h3>
                </div>
                <ul>
                  {data.quicklinks.map((item, i) => (
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
                  <h3>Contact </h3>
                </div>
                <div className="contact-ft">
                  <p>
                    Would you have any enquiries.Please feel free to contact us
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
                &copy; 2025 Design By <Link href="/">Chien Kieu</Link>. All
                Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
