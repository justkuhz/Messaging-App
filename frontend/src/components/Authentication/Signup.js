import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import React, { useState } from 'react';
import { Button, isLoading } from "@chakra-ui/button";

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => { };

    const submitHandler = () => {

    };

    return (
        <VStack spacing='5px' color='black'>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            {/* Can add a require top be 8 characters long, have numbers and letters and a special char
            */}
            <FormControl id='password' isRequired>
                <FormLabel>Enter Your Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter Your Password'
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width={'4.5rem'}>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            {/* Can add a require passwords to be matching
            */}
            <FormControl id='confirmPass' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Confirm Your Password'
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width={'4.5rem'}>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic'>
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type={'file'}
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            {/* Can add loading spinners on click
            */}
            <Button
                colorScheme={'blue'}
                width='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Sign Up
            </Button>

        </VStack>
    );
};

export default Signup