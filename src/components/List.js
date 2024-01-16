import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteList, dropchildinsamelist ,dropchildindifferentlist} from "../store/listSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import AddNew from "./AddNew";

const List = () => {
  const listItem = useSelector((store) => store.listSlice.list);
  console.log(listItem);
  const dispatch = useDispatch();

  const deleteListFn = (id) => {
    dispatch(deleteList({ id }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // console.log(source, destination);
    // console.log(result);
    const data={
      source:source,
      destination:destination
    }
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (source.droppableId === destination.droppableId) {
      dispatch(dropchildinsamelist(data));
    }
    if (source.droppableId !== destination.droppableId) {
      dispatch(dropchildindifferentlist(data));
    }

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {listItem.map((list, index) => (
        <div className="p-3 w-full md:w-1/3" key={list.id}>
          <div className={`p-3 bg-gray-100`}>
            <div className="mb-4">
              {list.title}
              <button
                title="Delete List"
                onClick={() => deleteListFn(list.id)}
                className="text-red-600 float-right"
              >
                ❌
              </button>
            </div>
            <Droppable droppableId={`droppable-${list.id}`} type="CARD">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {list?.children?.map((children, index) => (
                    <Draggable
                      key={children.id}
                      draggableId={`draggable-${children.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card cardInfo={children} index={index} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="mt-3">
              <AddNew type="card" parentId={list.id} />
            </div>
          </div>
        </div>
      ))}

      <div className="p-3 w-full md:w-1/3">
        <div className={`p-3 bg-gray-100 `}>
          <Droppable droppableId="droppable" type="CARD">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <AddNew />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default List;