export interface Character {
  name: string;
  alignment: string; // Assuming alignment is an index or name from the API response
  race?: string; // Optional property
  class?: string; // Optional property
  description?: string; // Optional property
  // Add additional properties as needed
}
