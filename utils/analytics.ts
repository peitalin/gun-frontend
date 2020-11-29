import React from "react";
import getConfig from "next/config";
import { UserPrivate } from "typings/gqlTypes";

// Use this to get the script that needs injecting into a <head> script tag
export const getAnalyticsHeadScript = (): string => {
  return ""
  // if (SEGMENT_KEY) {
  //   return `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  //   analytics.load("${SEGMENT_KEY}");
  //   }}();
  //   `;
  // } else {
  //   return "";
  // }
};

export const useAnalytics = (name: string, parameters?: object) => {
  // Record the page view
  React.useEffect(() => {
    // only run on client
    if (process.browser) {
      analyticsEvent(name, parameters);
    }
  }, [])
}

// Identify or update the currently logged- in user.
// This should be called anytime the user becomes known, or when any of the properties we're interested has changed.
// NOTE: This replaces the old values, so always feed it a full UserPrivate.
export const analyticsUser = (user: UserPrivate) => {
  if (window.analytics) {
    const parameters = {
      email: user.email,
      licenseId: user.licenseId || false,
      signupDate: user.createdAt,
      storeId: user.storeId || undefined,
      storeCreationDate: (user.store && user.store.createdAt) || undefined,
    };
    window.analytics.identify(user.id, parameters);
    console.log("Recorded analytics identity:", {
      userId: user.id,
      parameters
    });
  }
};

// Record an event, with some parameters.
export const analyticsEvent = (name: string, parameters?: object) => {
  if (window.analytics) {
    // Treat view events as special "page view" events.
    // NOTE: sending page view events is needed for some Segment destinations to work properly.
    if (name.startsWith("View.")) {
      window.analytics.page(name, parameters);
      console.log("Recorded analytics page view:", { name, parameters });
    } else {
      window.analytics.track(name, parameters);
      console.log("Recorded analytics event:", { name, parameters });
    }
  }
};
