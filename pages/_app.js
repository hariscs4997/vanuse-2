import "../styles/globals.css";
import "../components/header/header.css";
import "../components/footer/footer.css";
import "../components/mapBox/customMap.css";
import "../components/mainCards/cards.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../components/searchCard/searchCard.css";
import '../components/confirmBooking/confirmBooking.css'
import {Provider} from "react-redux";
import store from "../store/store";
import {CacheProvider} from '@emotion/react';
import Head from 'next/head';
import {ThemeProvider} from '@mui/material/styles';
import PropTypes from "prop-types";
import createEmotionCache from '../src/createEmotionCache';
import theme from '../src/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
          <title>Vanuse</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
