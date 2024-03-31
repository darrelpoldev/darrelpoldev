'use client';
import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Stack,
  Heading,
  Text,
  HStack,
  VStack,
  Divider,
  AbsoluteCenter,
  Button,
  Container,
  Flex,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
const ProfileDetails = () => {
  return (
    <Box paddingLeft={10} textAlign={'start'}>
      <Heading as="h1" size={'xl'} noOfLines={1} mb={1}>
        Darrel Pol
      </Heading>
      <Heading as="h2" size={'lg'} mb={4}>
        Experienced Software Engineer
      </Heading>
      <Text fontSize={'2xl'} noOfLines={3}>
        Welcome to my documentation space. I build code and write tech blogs.
      </Text>
    </Box>
  );
};

const SocialLinks = () => {
  const socialLinks = [
    {
      icon: faEnvelope,
      path: 'mailto: poldarrel.dev@gmail.com',
    },
    {
      icon: faGithub,
      path: 'https://github.com/darrelpoldev',
    },
    {
      icon: faLinkedin,
      path: 'https://www.linkedin.com/in/darrelpol/',
    },
  ];
  return (
    <HStack align="start">
      {socialLinks.map((link, index) => {
        return (
          <Box key={index}>
            <Link href={link.path}>
              <FontAwesomeIcon icon={link.icon} />
            </Link>
          </Box>
        );
      })}
    </HStack>
  );
};

interface InternalLinksProps {
  handleOnClick: (path: string) => void;
}

const InternalLinks: React.FC<InternalLinksProps> = (props) => {
  const internalLinks = [
    {
      displayText: 'About',
      path: 'about',
      section: 'about',
    },
    {
      displayText: 'Blogs',
      path: 'blogs',
      section: 'blogs',
    },
    {
      displayText: 'Experiences',
      path: 'experiences',
      section: 'experiences',
    },
  ];

  return (
    <VStack align="start">
      {internalLinks.map((link, index) => {
        return (
          <Box key={index}>
            <Button
              variant="link"
              onClick={() => props.handleOnClick(link.path)}
            >
              {link.displayText}
            </Button>
          </Box>
        );
      })}
    </VStack>
  );
};

const About = () => {
  return (
    <Box id="about">
      <Text>
        Hey, there! Welcome to my little corner of the internet. This is where I
        document all things I created or contributed to, to my own tech world.
        From blogs about software architecture or system designs and tech book
        that I've recently finished, to projects or prototypes that I've
        created.
      </Text>
      <Text>
        Aside from my day job as a software engineer, my main focus these days
        is to skill up and build up my knowledge about Artificial Intelligence
        or AI. I've been playing around different AI models and building
        prototypes, and also started writing tech blogs hoping to help a fellow
        learner of the future.
      </Text>
      <Text>
        When I'm not in front of the computer screen, I'm probably working out
        or walking outside. I might be also reading a manga on my phone or
        probably watching anime in the basement.
      </Text>
    </Box>
  );
};

const Blogs = () => {
  return (
    <Box id="blogs">
      <Heading as="h2">These are blogs</Heading>
    </Box>
  );
};

const Experiences = () => {
  return (
    <Box id="experiences">
      <Heading as="h2">Experiences</Heading>
    </Box>
  );
};

export default function Page() {
  const [pathToRender, setPathToRender] = useState('about');
  const handleChangeOfPath = (path: string) => {
    setPathToRender(path);
  };
  return (
    <SimpleGrid minChildWidth={'300px'} bg={'gray.200'}>
      <Box bg={'white'} minHeight={'100vh'} border={'1px solid'}>
        <Center h={'100%'}>
          <VStack align={'start'}>
            <ProfileDetails></ProfileDetails>
            <SocialLinks></SocialLinks>
          </VStack>
        </Center>
      </Box>
      <Box bg={'black'} minHeight={'100vh'} border={'1px solid'}></Box>
    </SimpleGrid>
  );
}
