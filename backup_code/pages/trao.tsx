import { themeDefault as theme } from "@theme";
import { ThemeProvider } from "@emotion/react";
import { GlobalCSS } from "@theme/style";
import "@assets/css/fonts.css";
import "@assets/css/icofont.css";
import "@assets/css/bootstrap.css";
import "@i18n";
import EventTrao from "@components/containers/event-trao";

const Checkin = ({}) => {
    return (
        <ThemeProvider theme={theme}>
            <div className="wrapper">
                <GlobalCSS />
                <EventTrao />
            </div>
        </ThemeProvider>
    );
};

export default Checkin;
