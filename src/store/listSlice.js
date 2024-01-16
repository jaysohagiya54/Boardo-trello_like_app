import { createSlice, current } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "listSlice",
  initialState: {
    list: [],
  },
  reducers: {
    addList: (state, action) => {
      state.list.push(action.payload);
    },
    addCard: (state, action) => {
      state.list.forEach((item) => {
        if (item.id === action.payload.parentId) {
          if (Object.hasOwn(item, "children")) {
            item.children.push(action.payload);
          } else {
            item.children = [];
            item.children.push(action.payload);
          }
        }
      });
    },
    deleteList: (state, action) => {
      console.log("called", state);
      const itemIndex = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.list.splice(itemIndex, 1);
      }
    },
    deleteChildList: (state, action) => {
      const { id, parentId } = action.payload;
      const itemIndex = state.list.findIndex((item) => item.id === parentId);
      console.log(itemIndex);
      if (itemIndex !== -1) {
        const childItemIndex = state.list[itemIndex].children.findIndex(
          (item) => item.id === id
        );
        if (childItemIndex !== -1) {
          state.list[itemIndex].children.splice(childItemIndex, 1);
        }
      }
    },
    updateChildList: (state, action) => {
      console.log(action.payload);
      const { id, parentId } = action.payload.cardInfo;
      console.log(id, parentId);
      const itemIndex = state.list.findIndex((item) => item.id === parentId);
      if (itemIndex !== -1) {
        const childItemIndex = state.list[itemIndex].children.findIndex(
          (item) => item.id === id
        );
        if (childItemIndex !== -1) {
          if (
            !state.list[itemIndex].children[childItemIndex].hasOwnProperty(
              "description"
            )
          ) {
            state.list[itemIndex].children[childItemIndex].description =
              action.payload.description;
          } else {
            state.list[itemIndex].children[childItemIndex].description =
              action.payload.description;
          }
        }
      }
    },
    dropchildinsamelist: (state, action) => {
      const { source, destination } = action.payload;
      if (
        source &&
        destination &&
        source.droppableId === destination.droppableId
      ) {
        const parentId = source.droppableId;
        console.log(parentId);
        const itemIndex = state.list.findIndex(
          (item) => "droppable-" + item.id.toString() === parentId
        );

        if (itemIndex !== -1) {
          const { index: sourceIndex } = source;
          const { index: destinationIndex } = destination;
          const updatedItem = { ...state.list[itemIndex] };
          [
            updatedItem.children[sourceIndex],
            updatedItem.children[destinationIndex],
          ] = [
            updatedItem.children[destinationIndex],
            updatedItem.children[sourceIndex],
          ];
          console.log("updated is", updatedItem);
          state.list = [
            ...state.list.slice(0, itemIndex),
            updatedItem,
            ...state.list.slice(itemIndex + 1),
          ];
        }
      }

      // console.log(current(state));
    },
    dropchildindifferentlist: (state, action) => {
      const { source, destination } = action.payload;
      console.log(source, destination);
      if (
        source &&
        destination &&
        source.droppableId !== destination.droppableId
      ) {
        const sourceParentId = source.droppableId;
        const destinationParentId = destination.droppableId;

        const sourceItemIndex = state.list.findIndex(
          (item) => "droppable-" + item.id.toString() === sourceParentId
        );

        const destinationItemIndex = state.list.findIndex(
          (item) => "droppable-" + item.id.toString() === destinationParentId
        );
        console.log(sourceItemIndex, destinationItemIndex);
        if (sourceItemIndex !== -1 && destinationItemIndex !== -1) {
          const { index: sourceIndex } = source;
          const { index: destinationIndex } = destination;
          console.log(sourceIndex, destinationIndex);
          console.log(current(state.list));

          // const movedItem = current(state.list[sourceItemIndex]?.children[sourceIndex]);
          // console.log("moved item",movedItem);
          // movedItem.parentId=state.list[destinationItemIndex].id;
          // console.log("moved item",movedItem);

          const movedItem = {
            ...current(state.list[sourceItemIndex]?.children[sourceIndex]),
          };
          console.log(movedItem,"before");

          // Check if movedItem is not undefined before updating parentId
          if (movedItem) {
            movedItem.parentId = state.list[destinationItemIndex].id;
            console.log("moved item", movedItem);
          } else {
            console.error("movedItem is undefined");
          }
          console.log(movedItem,"after");


          state.list[sourceItemIndex].children.splice(sourceIndex, 1);
          if (!state.list[destinationItemIndex].hasOwnProperty("children")) {
            state.list[destinationItemIndex].children = [];
          }
          state.list[destinationItemIndex].children.splice(
            destinationIndex,
            0,
            movedItem
          );
        }
      }
    },
  },
});
export const {
  addList,
  addCard,
  deleteList,
  deleteChildList,
  updateChildList,
  dropchildinsamelist,
  dropchildindifferentlist,
} = listSlice.actions;
export default listSlice.reducer;