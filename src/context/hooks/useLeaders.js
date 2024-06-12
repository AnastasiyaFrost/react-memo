import { useContext } from "react";
import { LeadersContext } from "../Leaders";

export function useLeaders() {
  return useContext(LeadersContext);
}
