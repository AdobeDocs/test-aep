/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const isBrowser = typeof window !== "undefined";

export const onClientEntry = () => {
    console.log('client entry')
    if (isBrowser) {
        window.alloy_all = window.alloy_all || {};
        window.alloy_all.data = window.alloy_all.data || {};
        window.alloy_all.data._adobe_corpnew = window.alloy_all.data._adobe_corpnew || {};
        window.alloy_all.data._adobe_corpnew = window.alloy_all.data._adobe_corpnew || {};
        window.alloy_all.data._adobe_corpnew.web = window.alloy_all.data._adobe_corpnew.web || {};
        window.alloy_all.data._adobe_corpnew.web.webPageDetails = window.alloy_all.data._adobe_corpnew.web.webPageDetails || {};
    }
};

export const onInitialClientRender = () => {
    console.log('init render')
    if (isBrowser) {
        if (typeof _satellite !== "undefined") {
            // eslint-disable-next-line no-undef
            //_satellite.track('pageload')
            // eslint-disable-next-line no-undef
            // _satellite.track('state',
            //     {
            //         xdm: {},
            //         data: {
            //             _adobe_corpnew: {
            //                 web: {
            //                     webPageDetails: {
            //                         customPageName: window.location.href
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // );

            //window.alloy_all.data._adobe_corpnew.web.webPageDetails.customPageName = window.location.href;
        }
    }
};

export const onRouteUpdate = ({ location, prevLocation }) => {
    if (isBrowser) {
        window.addEventListener('alloy_sendEvent', function (ev) {
            console.log('alloy')
            console.log(ev.detail.result); // response needed for target
            console.log(ev.detail.event);  // data and XDM values
            console.log(ev.detail.type);  // Hit type to make sure its a pageview call

        });

        if (typeof _satellite !== "undefined") {
            console.log(`route tracking page name as: ${location.href}`);

            // eslint-disable-next-line no-undef
            //_satellite.track('pageload')
            
            // eslint-disable-next-line no-undef
            _satellite.track('state',
                {
                    xdm: {},
                    data: {
                        _adobe_corpnew: {
                            web: {
                                webPageDetails: {
                                    customPageName: location.href
                                }
                            }
                        }
                    }
                }
            );

            //window.alloy_all.data._adobe_corpnew.web.webPageDetails.customPageName = location.href;
        }
    }
};