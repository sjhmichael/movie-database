import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";
import Footer from "../components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function Home() {
  const container = useRef(null);
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(".row1", { y: 20 }, { y: 0, duration: 0.9, opacity: 1 });
      tl.fromTo(
        ".row2",
        { y: 20 },
        { y: 0, duration: 0.9, opacity: 1 },
        "-=0.2",
      );
      tl.fromTo(
        ".row3",
        { y: 20 },
        { y: 0, duration: 0.9, opacity: 1 },
        "-=0.2",
      );
      tl.fromTo(
        ".row4",
        { y: 20 },
        { y: 0, duration: 0.9, opacity: 1 },
        "-=0.2",
      );
      tl.fromTo(
        ".row5",
        { y: 20 },
        { y: 0, duration: 0.9, opacity: 1 },
        "-=0.2",
      );
      tl.fromTo(
        ".row6",
        { y: 20 },
        { y: 0, duration: 0.9, opacity: 1 },
        "-=0.2",
      );
      tl.fromTo(
        ".row7",
        { y: 20 },
        { y: 0, duration: 0.9, opacity: 1 },
        "-=0.2",
      );
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <Main />
      {/* fetch URL from requests.js */}

      <div className="row1 opacity-0">
        <Row rowID="1" title="Popular" fetchURL={requests.requestPopular} />
      </div>

      <div className="row2 opacity-0">
        <Row rowID="2" title="Upcoming" fetchURL={requests.requestUpcoming} />
      </div>

      <div className="row3 opacity-0">
        <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
      </div>

      <div className="row4 opacity-0">
        <Row rowID="4" title="Top Rated" fetchURL={requests.requestTopRated} />
      </div>

      <div className="row5 opacity-0">
        <Row rowID="5" title="Action" fetchURL={requests.requestAction} />
      </div>

      <div className="row6 opacity-0">
        <Row rowID="6" title="Comedy" fetchURL={requests.requestComedy} />
      </div>

      <div className="row7 opacity-0">
        <Row rowID="7" title="Horror" fetchURL={requests.requestHorror} />
      </div>

      <div className="px-4 md:px-8">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
