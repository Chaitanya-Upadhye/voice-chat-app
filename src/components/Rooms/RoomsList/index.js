import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import useRoomControls from "../../../Hooks/useRoomControls";
import { useAuth0 } from "@auth0/auth0-react";
import useSession from "../../../Hooks/useSession";

function RoomsList() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [myStream, setLocalAudioStream] = useState(null);
  const [incomingStream, setincomingStream] = useState(null);

  const { socket, peer } = useSession();
  let audioRef = useRef();

  const [joinRoom] = useRoomControls(
    user,
    isAuthenticated,
    isLoading,
    setParticipants
  );

  return (
    <Box>
      <Box
        py={2}
        px={4}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"fit-content"}
        boxShadow={"md"}
      >
        <Text>All Rooms</Text>
        <Button color={"teal.400"}>+ Room</Button>
      </Box>
      <Box
        onClick={async () => {
          joinRoom("cbfc0843-1900-4fc9-a590-485c14de61c0", setParticipants);

          setIsRoomJoined(true);
        }}
      >
        Click to join room
      </Box>
      {isRoomJoined ? (
        <RoomModal
          participants={participants}
          isOpen={isRoomJoined}
          socket={socket}
          myStream={myStream}
          incomingStream={incomingStream}
          onClose={() => {
            socket.emit(
              "user-left-room",
              {
                roomId: "cbfc0843-1900-4fc9-a590-485c14de61c0",
                user: participants.find((p) => p.userId === user.sub),
              },
              async (response) => {
                //callback
                setParticipants(response);
              }
            );
            setIsRoomJoined(false);
            socket.removeAllListeners();
          }}
          setParticipants={setParticipants}
          audioRef={audioRef}
        ></RoomModal>
      ) : null}
    </Box>
  );
}

const RoomModal = ({
  onClose = () => {},
  isOpen = false,
  participants = [],
  myStream,
  audioRef,
  incomingStream,
}) => {
  let incomingRef = useRef();
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.srcObject = myStream;
    }
    if (incomingRef.current) incomingRef.current.srcObject = incomingStream;
  }, [myStream]);

  return (
    <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text my={4}>Participants</Text>
          {participants
            .filter((p) => p.role === "A")
            .map((p, idx) => {
              return <Prticipant participant={p} key={idx} />;
            })}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Prticipant = ({ participant }) => {
  let incomingRef = useRef();
  useEffect(() => {
    if (incomingRef.current && participant.stream)
      incomingRef.current.srcObject = participant.stream;
  });
  return (
    <div style={{ display: "inline-block" }}>
      <Avatar my={2} name={participant.userId}></Avatar>
      {participant.stream ? (
        <audio autoPlay ref={incomingRef}></audio>
      ) : null}{" "}
    </div>
  );
};

export default RoomsList;
