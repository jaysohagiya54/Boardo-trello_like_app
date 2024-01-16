import React, { useState } from "react";
import Modal from "react-modal";
import { deleteChildList, updateChildList } from "../store/listSlice";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

Modal.setAppElement("#root");
const Card = ({ cardInfo, index }) => {
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(null);
  const [textareaValue, setTextareaValue] = useState(" ");
  // const listItem = useSelector((store) => store.listSlice.list);
  const openModal = (cardId) => {
    console.log(cardId,"cardid");
    setSelectedCard(cardId);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };
  function removeChild() {
    console.log("clicked");
    console.log("cardInfo", cardInfo);
    console.log("id", cardInfo);
    dispatch(deleteChildList(cardInfo));
  }
  const updatedData = {
    cardInfo: cardInfo,
    description: textareaValue,
  };
  const handleclick = () => {
    console.log(cardInfo);
    dispatch(updateChildList(updatedData));
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => openModal()}>
        <div className="bg-white p-2 mt-2 shadow-md rounded-md ">
          {cardInfo.title}
          <button
            title="Delete Card"
            className="text-red-600 float-right font-bold"
            onClick={removeChild}
          >
           ❌
          </button>
        </div>
      </div>

      <Modal
        isOpen={selectedCard !== null}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="border border-black rounded-lg bg-red-100 mb-10">
          <div className="flex justify-between">
            <p
              className="m-2"
              style={{ "font-family": " Arial, Helvetica, sans-serif" }}
            >
              Title:-{cardInfo.title}
            </p>
            <button onClick={closeModal} className="border-2 border-b-slate-400 m-2 w-[45px] hover:border-black hover:cursor-pointer">
            ❌
            </button>
          </div>

          <div className="m-2  rounded-lg">
            <p
              className="my-1"
              style={{ "font-family": " Arial, Helvetica, sans-serif" }}
            >
              Description:-
            </p>
            <textarea
              className="border border-black mx-2"
              rows="4"
              cols="50"
              value={textareaValue !== "" ? textareaValue : ""}
              onChange={(e) => setTextareaValue(e.target.value)}
              style={{ "font-family": " Arial, Helvetica, sans-serif" }}
            ></textarea>
            <br></br>
            <button
              className="m-1 bg-gray-100 rounded-lg w-[50px] mx-60 hover:cursor-pointer"

              onClick={handleclick}
              style={{ "font-family": " Arial, Helvetica, sans-serif" }}
            >
              Save
            </button>
          </div>
          <div className="my-2 pl-2">
            <p style={{ "font-family": " Arial, Helvetica, sans-serif" }}>
              Created By:- {cardInfo.createdBy}
            </p>
          </div>
          <div className="my-2 pl-2">
            <p style={{ "font-family": " Arial, Helvetica, sans-serif" }}>
              Created Date:-{cardInfo.createdDate}{" "}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;