{
  /* This is where we will grab the information from the 
    5eSRD API */
}
{
  /* Get alignments */
}
import axios from "axios";
import { ApiOutput } from "./interface/api";

const baseURL = "https://www.dnd5eapi.co/api";

export async function getAlignments(): Promise<ApiOutput[]> {
  try {
    const response = await axios.get(`${baseURL}/alignments`);
    console.log("API Response:", response.data); // Log the entire response

    // Check if response.data has a "count" property (indicating object format)
    if (typeof response.data === "object" && "count" in response.data) {
      console.log("Data is an object:", response.data); // Log the data object

      // Extract alignments from the response object
      const alignments = response.data.results;

      // Map the data to the desired format using the ApiOutput interface
      const mappedAlignments = alignments.map((alignment: ApiOutput) => ({
        index: alignment.index,
        name: alignment.name,
        url: alignment.url,
      }));

      console.log("Mapped Alignments:", mappedAlignments); // Log the mapped alignments
      return mappedAlignments;
    } else {
      throw new Error("Unexpected API response format for alignments");
    }
  } catch (error) {
    console.error("Error fetching alignments:", error);
    return [];
  }
}
