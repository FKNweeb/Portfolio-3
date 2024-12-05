import { create } from "zustand";

const useNamesStore = create( set => ({
    names: [],
    namesFetched: (value) => set( state => ({names: value ? value : []}))
}));

export default useNamesStore;