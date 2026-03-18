import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled , { keyframes } from "styled-components";
import Chatbot from "./components/Chatbot";

// Animation for the highlight text
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Highlight text styling
const HighlightText = styled.div`
  position: fixed;
  bottom: 100px; /* Slightly above the chatbot */
  right: 50px;   /* Align with the chatbot */
  background-color: rgba(255, 255, 255, 0.8); /* Background for visibility */
  color: #333;   /* Dark color for contrast */
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  animation: ${fadeIn} 3s ease-in-out infinite; /* Flashing animation */
  z-index: 1001; /* Above other elements but below chatbot */
`;

// Chatbot footer styling
const ChatbotFooter = styled.div`
  font-size: 12px;
  color: gray;
  text-align: center;
  padding: 10px;
  border-top: 1px solid #ddd;
`;
// Chatbot container to make it always visible on top
const ChatbotWrapper = styled.div`
  position: fixed; /* Fixed position to make it stick on the screen */
  bottom: 20px;    /* Adjust based on where you want it */
  right: 20px;     /* Adjust based on where you want it */
  z-index: 1000;   /* High z-index to ensure it’s above all other elements */
  width: 350px;    /* Set width of the chatbot */
  height: 500px;   /* Set height of the chatbot */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional styling for shadow */
`;

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  console.log(openModal)
  const [showHighlight, setShowHighlight] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHighlight(false); // Hide the highlight text after 5 seconds
    }, 10000);
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router >
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
        {/* Highlight text */}
        {showHighlight && <HighlightText>Chat with Manoj's Assistant</HighlightText>}

        {/* Chatbot placed in a fixed wrapper */}
        <ChatbotWrapper>
          <Chatbot />
        </ChatbotWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
