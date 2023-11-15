import ReactGA from "react-ga4";

let devMode = true;

export function analyticsInitalize(debug) {
  devMode = debug;
  ReactGA.initialize("G-EQEF5W7KXK", {
    gaOptions: {
      debug_mode: debug,
    },
    gtagOptions: {
      debug_mode: debug,
    },
  });
  console.log("Analytics initialized");
}

export function analyticsSendPage(relative_url) {
  if (devMode) {
    console.log(`Sent ${"DEVMODE_ " + relative_url} to analytics`);
    ReactGA.send({ hitType: "pageview", page: "DEVMODE_ " + relative_url });
  }
  ReactGA.send({ hitType: "pageview", page: relative_url });
}
