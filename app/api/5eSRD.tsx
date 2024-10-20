{
  /* This is where we will grab the information from the 
    5eSRD API */
}
{
  /* Get alignments */
}
import axios from "axios";
import { ApiOutput } from "../interface/api";

const baseURL = "https://www.dnd5eapi.co/api";

const fetchResource = async (endpoint: string) => {
  try {
    const response = await axios.get(`${baseURL}/${endpoint}`);

    if (!response.data.count) {
      throw new Error("Unexpected API response format");
    }

    const results = response.data.results;
    return results.map((item: ApiOutput) => ({
      index: item.index,
      name: item.name,
      url: item.url,
    }));
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};

export async function getAlignments(): Promise<ApiOutput[]> {
  return fetchResource("alignments");
}

export async function getRaces(): Promise<ApiOutput[]> {
  return fetchResource("races");
}
export async function getClasses(): Promise<ApiOutput[]> {
  return fetchResource("classes");
}
