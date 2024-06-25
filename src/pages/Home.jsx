import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Main />
      {/* fetch URL from requests.js */}
      <Row rowID="1" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID="2" title="Upcoming" fetchURL={requests.requestUpcoming} />
      <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
      <Row rowID="4" title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row rowID="6" title="Action" fetchURL={requests.requestAction} />
      <Row rowID="6" title="Comedy" fetchURL={requests.requestComedy} />
      <Row rowID="5" title="Horror" fetchURL={requests.requestHorror} />
      <Footer />
    </div>
  );
}

export default Home;
