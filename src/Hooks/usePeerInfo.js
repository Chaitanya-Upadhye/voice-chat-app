import { useEffect, useState } from "react";
import { Peer } from "peerjs";

function usePeerInfo() {
  const [peerId, setpeerId] = useState(null);
  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setpeerId(id);
    });
  }, []);

  return [peerId];
}

export default usePeerInfo;
