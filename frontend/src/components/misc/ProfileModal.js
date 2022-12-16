import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    IconButton,
    Button,
    Image,
    Text,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

// @Param user: user that is currently logged into the chats page
// @Param children: Display children information wrapped within ProfileModal
const ProfileModal = ({ user, children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {/*Conditional to display children information if there are any, otherwise display an eye icon*/ }
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                    <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            )}

            <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent height="410px">
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="Work sans"
                        display={"flex"}
                        justifyContent="center"
                    >
                        {user.name}
                    </ModalHeader>
                    <ModalBody
                        display="flex"
                        flexDir={"column"}
                        alignItems="center"
                        justifyContent={"space-between"}
                    >
                        <Image
                            borderRadius={"full"}
                            boxSize="150px"
                            src={user.picture}
                            alt={user.name}
                        />
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            fontFamily="Work sans"
                        >
                            {user.email}
                        </Text>
                    </ModalBody
                    >
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose} marginBottom="10px">
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProfileModal;
