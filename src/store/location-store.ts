import { createStore } from "@tanstack/store";

type LocatioState={
    lat:number|null;
    lon:number|null;
};

export const locationStore=createStore<LocatioState>({
    lat:null,
    lon:null,
});