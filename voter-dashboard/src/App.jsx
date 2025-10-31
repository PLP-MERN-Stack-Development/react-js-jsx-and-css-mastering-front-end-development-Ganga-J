import React from 'react'; // Always import React if you use JSX
import Header from "../src/components/Header";
import Home from "../src/components/Home";
import Footer from '../src/components/Footer';

export default function App() {
  return ( // Explicitly return the JSX
    <>
      <Header />
      <Home />
      <Footer/>
    </>
  );
}