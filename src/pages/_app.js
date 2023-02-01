import Navbar from "@/components/Navbar/Navbar.jsx";
import "@/styles/globals.css";
import "./index.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
