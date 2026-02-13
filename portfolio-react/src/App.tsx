import { HashRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./i18n/I18nContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <I18nProvider>
      <HashRouter>
        <ScrollToHash />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </HashRouter>
    </I18nProvider>
  );
}

export default App;
