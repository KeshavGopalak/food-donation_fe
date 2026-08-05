import { useQuery } from "@tanstack/react-query";
import { getDonations } from "@/services/volunteerServices";
import { queryKeys } from "@/services/queries/queryKeys";

export const useDonations = () => {
  return useQuery({
    queryKey: queryKeys.donations.all,
    queryFn: getDonations,
  });
};