import axios from "axios";
import { IMenuItem } from "@utils/interfaces/index.jsx";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  const [sampleData, setSampleData] = useState<FooterData | undefined>();

  useEffect(() => {
    axios("http://localhost:1337/api/global", {
      headers: {
        Authorization:
          "Bearer e6da340acf8ce35b0103dc7c3a740747365a08317032da63ad72146ab76861ed1157bc8ca434d95f513fe820c5c44a822aa64432b0e059718e60f2e21be853fad6879a2a24e8649b55537f6f60c69be8c3cc5f5b5dbc2ba90207fefa283d3fae6ce4f1a19049aba30e31f2c8494167116ccebfc19f548ede42f0d3191748e2a0",
      },
    }).then((data) => {
      setSampleData(data.data.data as any);
    });
  }, []);

  console.log(sampleData);
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
