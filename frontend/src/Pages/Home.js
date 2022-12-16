// Home/default landing page

import React, { useEffect } from 'react';
import { Container, Box, Image, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from 'react-router-dom';
import background from "../resources/homepage.jpg"

const Home = () => {

  // If user is logged in or userInfo exists, push them to chats page
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // If user info found, re-route to chats
    if (userInfo) {
        history.push("/chats");
    }
  }, [history])
  
  return (
    <Box
      backgroundImage={`url(${background})`}
      display='flex'
      height={'100vh'}
      width={'100vw'}
      backgroundSize='cover'
      backgroundRepeat={'no-repeat'}
    >
      <Container maxW='xl' centerContent>
        <Box
          display={'flex'}
          textAlign={'center'}
          justifyContent={'center'}
          p={3}
          bg={'white'}
          w={'100%'}
          m={'40px 0 15px 0'}
          borderRadius={'lg'}
          borderWidth={'1px'}
        >
          <Text
            alignContent={"center"}
            as="b"
            fontSize={"50px"}
            fontFamily="Work sans"
          >
            Messaging App
            <Text
              alignContent={"center"}
              fontSize="24px"
              as=""
            >
              < br/>
              Jesse Montel, Kyle Techentin, Ken Zhu
            </Text>
          </Text>
        </Box>
        <Box
          bg={'white'}
          w={'100%'}
          p={4}
          borderRadius='lg'
          borderWidth={'1px'}
          color='black'
        >
          <Tabs variant='soft-rounded'>
            <TabList mb='1em'>
              <Tab width='50%'>Login</Tab>
              <Tab width='50%'>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {<Login />}
              </TabPanel>
              <TabPanel>
                {<Signup />}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  )
}

export default Home;