import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import "../styles/search-bar.css";

const SearchBar = () => {
  const locationRef = useRef("");
  const maxGroupSizeRef = useRef();
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || maxGroupSize === "") {
      return alert("All fields are required!");
    }
    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${location}&maxGroupSize=${maxGroupSize}`
    );

    if (!res.ok) {
      alert("something went wrong");
    }
    const result = await res.json();
    navigate(`/search?city=${location}&maxGroupSize=${maxGroupSize}`, {
      state: result.data,
    });
  };

  //date format, no placeholder on input
  const [dateValue, setDateValue] = useState("");
  const handleFocus = () => {
    setType("date");
  };

  const handleBlur = () => {
    if (!dateValue) {
      setType("text");
    }
  };

  const handleChange = (e) => {
    setDateValue(e.target.value);
  };

  const [type, setType] = useState("text");
  return (
    <div className="booking__container container-fluid mt-3">
      <div className="container mt-3">
        <div className="row">
          <div className="form__group col-sm-5">
            <div className="input__group">
              <input type="text" ref={locationRef} />
              <label>Destination</label>
            </div>
            <p>Where do you want to go ?</p>
          </div>
          {/* <div className="form__group col-sm-3 p-3">
            <div className="input__group">
              <input
                type={type}
                value={dateValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <label>From</label>
            </div>
            <p>Add date</p>
          </div>
          <div className="form__group col-sm-3  p-3">
            <div className="input__group">
              <input
                type={type}
                value={dateValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <label>To</label>
            </div>
            <p>Add date</p>
          </div> */}
          <div className="form__group col-sm-5 ">
            <div className="input__group">
              <input type="number" ref={maxGroupSizeRef} />
              <label>Guests</label>
            </div>
            <p>Add guests</p>
          </div>
          <div className="form__group col-sm-2 ">
            <button className="btn" type="submit" onClick={searchHandler}>
              <i className="ri-search-line"></i>
            </button>
          </div>
        </div>
      </div>
      {/* <form className="row">
        <div className="form__group">
          <div className="input__group">
            <input type="text" ref={locationRef} />
            <label>Destination</label>
          </div>
          <p>Where do you want to go ?</p>
        </div>
        <div className="form__group ">
          <div className="input__group">
            
            <input
              type={type}
              value={dateValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <label>From</label>
          </div>
          <p>Add date</p>
        </div>
        <div className="form__group">
          <div className="input__group">
            <input
              type={type}
              value={dateValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <label>To</label>
          </div>
          <p>Add date</p>
        </div>
        <div className="form__group">
          <div className="input__group">
            <input type="number" ref={maxGroupSizeRef} />
            <label>Guests</label>
          </div>
          <p>Add guests</p>
        </div>
      </form> */}
    </div>
  );
};

export default SearchBar;
