import React from "react";

const Form = props => {
  const { toggleModal, showModal, handleSubmit, handleChange, date } = props;

  return (
    <div>
      {showModal ? (
        <div className="relative">
          <div
            className="absolute py2 px3 pointer hover gray"
            size={18}
            color="lightgray"
            onClick={toggleModal}
            style={{ top: 5, right: 5 }}
          >
            X
          </div>
          <form
            className="flex flex-column border-divider bg-white rounded pt3 px2 pb2 mx2 mb2"
            onSubmit={handleSubmit}
          >
            <label className="py1 h5 gray">Date</label>
            <input
              type="date"
              name="date"
              value={date}
              className="border-divider rounded p1 mb1 h5"
              onChange={handleChange}
            />
            <label className="py1 h5 gray">Store</label>
            <input
              type="text"
              name="store"
              className="border-divider rounded p1 mb1 h5"
              onChange={handleChange}
            />
            <label className="py1 h5 gray">Amount</label>
            <input
              type="number"
              name="amount"
              min="0.01"
              step="0.01"
              max="2500"
              className="border-divider rounded p1 mb1 h5"
              onChange={handleChange}
            />
            <input
              type="submit"
              className="bg-green box-shadow h5 white p1 mt1 border-none rounded"
            />
          </form>
        </div>
      ) : (
        <div className="px2">
          <button
            className="bg-green box-shadow h5 white p1 mb2 border-none rounded col-12"
            onClick={toggleModal}
          >
            Add New
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
