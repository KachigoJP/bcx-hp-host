import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

// import 3rd CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// import them CSS
import "@utils/theme/styles/animate.css";
import "@utils/theme/styles/flaticon.css";
import "@utils/theme/styles/font-awesome.min.css";
import "@utils/theme/styles/themify-icons.css";

// import custom CSS
import "@styles/sass/style.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>
          Bàn Chân Xanh - Tổ chức phi lợi nhuận về các hoạt động cho người Việt
          ở Nhật.
        </title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  );
}

export default MyApp;
