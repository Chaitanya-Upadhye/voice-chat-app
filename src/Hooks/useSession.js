import { useContext } from "react";
import SessionContext from "../Contexts/SessionContext";

function useSession() {
  const session = useContext(SessionContext);

  return session;
}

export default useSession;
