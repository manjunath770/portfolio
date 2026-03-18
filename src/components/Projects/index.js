import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From Machine learning to Generative AI. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton active value="web app" onClick={() => setToggle('web app')}>Web App</ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => setToggle('web app')}>Web App</ToggleButton>
          }
          <Divider />
          {toggle === 'Deep Learning' ?
            <ToggleButton active value="Deep Learning" onClick={() => setToggle('Deep Learning')}>Deep Learning</ToggleButton>
            :
            <ToggleButton value="Deep Learning" onClick={() => setToggle('Deep Learning')}>Deep Learning</ToggleButton>
          }
          <Divider />
          {toggle === 'Mlops' ?
            <ToggleButton active value="Mlops" onClick={() => setToggle('Mlops')}>Mlops</ToggleButton>
            :
            <ToggleButton value="Mlops" onClick={() => setToggle('Mlops')}>Mlops</ToggleButton>
          }
           <Divider />
          {toggle === 'Analytics' ?
            <ToggleButton active value="Analytics" onClick={() => setToggle('Analytics')}>Analytics</ToggleButton>
            :
            <ToggleButton value="Analytics" onClick={() => setToggle('Analytics')}>Analytics</ToggleButton>
          }
          <Divider />
          {toggle === 'machine learning' ?
            <ToggleButton active value="machine learning" onClick={() => setToggle('machine learning')}>Machine Learning</ToggleButton>
            :
            <ToggleButton value="machine learning" onClick={() => setToggle('machine learning')}>Machine Learning</ToggleButton>
          }
          <Divider />
          {toggle === 'Genarative AI' ?
            <ToggleButton active value="Genarative AI" onClick={() => setToggle('Genarative AI')}>Genarative AI</ToggleButton>
            :
            <ToggleButton value="Genarative AI" onClick={() => setToggle('Genarative AI')}>Genarative AI</ToggleButton>
          }
        </ToggleButtonGroup>
        <CardContainer>
          {toggle === 'all' && projects
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
          {projects
            .filter((item) => item.category == toggle)
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects