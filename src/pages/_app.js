import Root from "../../components/Header/Root";
import "./index.css";

function MyApp({ Component, pageProps }) {
  return (
    <Root>
      <Component {...pageProps} />
    </Root>
  );
}

export default MyApp;
