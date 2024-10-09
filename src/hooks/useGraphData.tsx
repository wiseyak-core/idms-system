import { create } from "zustand";

interface GraphStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData: (data: any) => void;
}

export const useGraphStore = create<GraphStore>()((set) => ({
  data: null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData: (data: any) => set({ data }),
}));
