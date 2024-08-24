import { useAppSelector } from "../store";

export const useTest = () => useAppSelector((store) => store.test.test);
