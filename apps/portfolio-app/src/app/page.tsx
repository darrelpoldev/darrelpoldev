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
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ProfileDetails = () => {
  return (
    <Box>
      <Heading as="h2" size="3xl" noOfLines={1}>
        Darrel Pol
      </Heading>
      <Text fontSize="3xl">Experienced Software Engineer</Text>
      <Text fontSize="xl">Welcome to my documentation space.</Text>
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
    <VStack align="start">
      {socialLinks.map((link, index) => {
        return (
          <Box key={index}>
            <Link href={link.path}>
              <FontAwesomeIcon icon={link.icon} />
            </Link>
          </Box>
        );
      })}
    </VStack>
  );
};

const InternalLinks = () => {
  const internalLinks = [
    {
      displayText: 'About',
      path: '/#about',
      section: 'about',
    },
    {
      displayText: 'Blogs',
      path: '/#blogs',
      section: 'blogs',
    },
    {
      displayText: 'Experiences',
      path: '/#experiences',
      section: 'experiences',
    },
  ];

  return (
    <VStack align="start">
      {internalLinks.map((link, index) => {
        return (
          <Box key={index}>
            <Link href={link.path}>{link.displayText}</Link>
          </Box>
        );
      })}
    </VStack>
  );
};

const About = () => {
  return (
    <Box id="about">
      <Heading as="h2">About Blah</Heading>;
    </Box>
  );
};

const Blogs = () => {
  return (
    <Box id="blogs">
      <Heading as="h2">Blogs</Heading>;
    </Box>
  );
};

const Experiences = () => {
  return (
    <Box id="experiences">
      <Heading as="h2">Experiences</Heading>;
    </Box>
  );
};

export default async function Page() {
  return (
    <Stack
      direction={['column', 'row']}
      spacing={4}
      align="center"
      justify="center"
      height="50vh"
    >
      <Box className="left-panel">
        <ProfileDetails></ProfileDetails>
        <SocialLinks></SocialLinks>
        <Box position="relative" padding="4">
          <Divider />
          <AbsoluteCenter bg="white" px="2">
            Explore
          </AbsoluteCenter>
        </Box>
        <InternalLinks></InternalLinks>
      </Box>
      <Box className="right-panel">
        <Heading>Content</Heading>

        {/* This is where a scrollable page will show */}
      </Box>
    </Stack>
  );
}
