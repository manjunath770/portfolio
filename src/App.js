import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
// ❌ removed About
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled , { keyframes } from "styled-components";
import Chatbot from "./components/Chatbot";

// Animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const HighlightText = styled.div`
  position: fixed;
  bottom: 100px;
  right: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  animation: ${fadeIn} 3s ease-in-out infinite;
  z-index: 1001;
`;

// ❌ removed ChatbotFooter

const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  width: 350px;
  height: 500px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), 
              linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`;

function App() {
  const [darkMode] = useState(true); // ✅ removed setDarkMode
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [showHighlight, setShowHighlight] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHighlight(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Navbar />
        <Body>
          <HeroSection />
          <Wrapper>
            <Skills />
            <Experience />
          </Wrapper>
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <Wrapper>
            <Education />
            <Contact />
          </Wrapper>
          <Footer />
          {openModal.state &&
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          }
        </Body>

        {showHighlight && <HighlightText>Chat with Manoj's Assistant</HighlightText>}

        <ChatbotWrapper>
          <Chatbot />
        </ChatbotWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;