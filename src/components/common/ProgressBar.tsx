// https://github.com/apal21/nextjs-progressbar/issues/86

"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { Global, css } from "@emotion/react";

const ProgressBar = () => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = (mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === "childList") {
          const target = mutation.target as Element; 
          const anchorElements =
            target.querySelectorAll<HTMLAnchorElement>("a[href]");
          anchorElements.forEach((anchor: HTMLAnchorElement) =>
            anchor.addEventListener("click", handleAnchorClick)
          );
        }
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: any) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  }, []);

  return (
    <Global
      styles={css`
        #nprogress {
          pointer-events: none;
          .bar {
            top: 0;
            left: 0;
            height: 2px;
            width: 100%;
            position: fixed;
            z-index: 9999999999;
            background: #319795;
          }
          .peg {
            right: 0;
            opacity: 1;
            width: 100px;
            height: 100%;
            display: block;
            box-shadow: none;
            position: absolute;
            transform: rotate(3deg) translate(0px, -4px);
          }
        }
      `}
    />
  );
};

export default ProgressBar;
