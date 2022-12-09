// Home/default landing page

import React from 'react';
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Home = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
        d={'flex'}
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
          as={'b'}
          fontSize={'4xl'}
          fontFamily={'Work sans'}
          color={'black'}
        >
          Messaging App
          <br />
        </Text>
        <Text
          as={'i'}
          fontSize={'2xl'}
          fontFamily={'Work sans'}
          color={'black'}
        >
          Jesse Montel, Kyle Techentin, Ken Zhu
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
  )
}

export default Home;