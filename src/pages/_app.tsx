import { ToastContainer } from "react-toastify";
import Head from "next/head";
import type { AppProps } from "next/app";

// import 3rd CSS
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import them CSS
import "../styles/animate.css";
import "../styles/flaticon.css";
import "../styles/font-awesome.min.css";
import "../styles/themify-icons.css";

// import custom CSS
import "@styles/sass/style.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>
          Bàn Chân Xanh - Tổ chức phi lợi nhuận về các hoạt động cho người Việt ở Nhật.
        </title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  );
}

export default MyApp;
