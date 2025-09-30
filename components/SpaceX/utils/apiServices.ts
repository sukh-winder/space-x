import apiClient from "@/helper/apiClient";
import { LaunchesPagination } from "@/helper/types/launchesPagination";

const endpoints = {
  launches: "v5/launches/query",
  launchpads: "v4/launchpads",
};

export const getSpaceXLaunches = async (pagination: {
  query?: object;
  options: LaunchesPagination;
}) => {
  const response = await apiClient.post(endpoints.launches, pagination);

  return response;
};

export const getLaunchPadById = async (id: string) => {
  const response = await apiClient.get(`${endpoints.launchpads}/${id}`);
  return response;
};
