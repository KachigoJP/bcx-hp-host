import { IMenuItem } from "@utils/interfaces/index.jsx";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { Global } from "../../../lib/strapi";
import { globalService } from "../../../lib/strapi";

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
  const [sampleData, setSampleData] = useState<Global | undefined>();

  useEffect(() => {
    // Using the new Strapi service instead of direct axios call
    globalService
      .get({ populate: "*" })
      .then((globalData: Global) => {
        console.log("Global data from Strapi:", globalData);
        setSampleData(globalData);
      })
      .catch((error: any) => {
        console.error("Error fetching global data:", error);
      });
  }, []);

  console.log("Sample data:", sampleData);
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
                  <h3>{(sampleData as any)?.siteName || "here"}</h3>
                </div>
                <ul>
                  {data.menus &&
                    data.menus.length > 0 &&
                    data.menus.map((item, i) => (
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
                  <h3>Liên Kết Nhanh</h3>
                </div>
                <ul>
                  {data.quicklinks &&
                    data.quicklinks.length > 0 &&
                    data.quicklinks.map((item, i) => (
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
                  <h3>Liên Hệ</h3>
                </div>
                <div className="contact-ft">
                  <p>
                    Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng
                    tôi
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
