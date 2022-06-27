import { useEffect, useState } from "react";
import useSession from "./useSession";

function useRoomControls(user, isAuthenticated, isLoading) {
  const [joinRoom, setJoinRoom] = useState(() => {});
  const { peer, socket } = useSession();
  useEffect(() => {
    if (!isAuthenticated || isLoading) return;
    setJoinRoom(() => {
      return (roomId, setParticipants = () => {}) =>
        socket.emit(
          "user-joined-room",
          {
            roomId,
            user: user,
            peerId: peer._id,
          },
          async (response) => {
            setParticipants(response);

            const stream = await navigator.mediaDevices.getUserMedia({
              video: false,
              audio: true,
            });
            console.log("mystream", { stream, peer });
            peer.on("call", function (call) {
              call.answer(stream);
            });

            for (const participant of response) {
              const call = peer.call(participant.peerId, stream, {
                metadata: { participantInfo: participant },
              });
              call.on("stream", function (incomingStream) {
                setParticipants((prev) => {
                  return prev.map((participantPrev) => {
                    if (participantPrev.peerId === participant.peerId)
                      participantPrev.stream = incomingStream;
                    return participantPrev;
                  });
                });
              });
            }

            socket.on("user-joined-room", (resp) => {
              console.log("user joined room", resp);

              if (stream) {
                console.log("calling", resp.peerId);
                let outgoing = peer.call(resp.peerId, stream, {
                  metadata: { participantInfo: resp },
                });
                outgoing.on("stream", function (stream) {
                  // Do something with this audio stream
                  console.log("answered call with ", stream);
                  resp.stream = stream;

                  setParticipants((prev) => {
                    let participants = [...prev];
                    if (!prev.find((u) => u.userId === resp.userId))
                      participants = [...prev, resp];
                    return participants;
                  });
                });
              }
            });
            socket.on("user-left-room", (resp) => {
              setParticipants((p) => {
                return p.filter((u) => u.userId !== resp.userId);
              });
            });
          }
        );
    });
  }, [isAuthenticated, peer, socket]);

  return [joinRoom];
}

export default useRoomControls;
