import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VinylItem {
  id: string;
  title: string;
  coverImage: string;
}

interface CollectionState {
  items: VinylItem[];
}

const initialState: CollectionState = {
  items: [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addVinyl: (
      state,
      action: PayloadAction<{ id: string; title: string; coverImage: string }>,
    ) => {
      const itemInCollection = state.items.some(
        (item) => item.id === action.payload.id,
      );
      if (!itemInCollection) {
        state.items.push(action.payload);
      }
    },
    removeVinyl: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addVinyl, removeVinyl } = collectionSlice.actions;

// Selectors
export const selectAllVinyl = (state: { collection: CollectionState }) =>
  state.collection.items;

export const selectVinylById = (
  state: { collection: CollectionState },
  id: string,
) => state.collection.items.find((item) => item.id === id);

export default collectionSlice.reducer;
