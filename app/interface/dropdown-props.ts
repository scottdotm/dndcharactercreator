import { ApiOutput } from "./api";
export interface DropdownProps {
  data: ApiOutput[];
  selectedData: string;
  setSelectedData: (data: string) => void;
  isLoading: boolean;
}
