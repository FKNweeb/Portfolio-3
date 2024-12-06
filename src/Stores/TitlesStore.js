import { create } from "zustand";

const useTitlesStore = create( set => ({
    titles: [],
    titlesFetched: (value) => set( state => ({titles: value ? value : []}))
}));


export default useTitlesStore;