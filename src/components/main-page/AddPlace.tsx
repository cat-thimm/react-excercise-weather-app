import { useState } from "react";
import { Place } from "../../types/app-types";
import {addPlace} from './Overview.helper'

interface AddPlaceProps {
  places: Place[],
  setPlaces: (places: Place[]) => void
}

const AddPlace = ({ places, setPlaces }: AddPlaceProps) => {
  const [place, setPlace] = useState<string>("");

  const addNewPlace = (place: string) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    addPlace(setPlaces, { id: id, place: place }, places);
    setPlace("");
  };

  return (
    <div className="column add-place">
      <div className="add-place__header">
        {localStorage.getItem("userName")
          ? "Welcome back " + localStorage.getItem("userName") + "!"
          : "Welcome to Weather with you!"}
      </div>
      <div className="add-place__info-text">
        {localStorage.getItem('places') ? 'You can continue adding new places here.' : 'Start adding new places to get a weather forecast.'}
      </div>
      <div className="row add-place__input-row">
        Place
        <input
          className="add-place__input"
          value={place}
          onChange={(e) => {
            setPlace(e.target.value);
          }}
        />
        <button
          className="add-place__button"
          onClick={() => addNewPlace(place)}
          disabled={place?.length === 0 || place.length > 25}
        >
          Add
        </button>
      </div>
      {place.length > 25 && (
        <div className="add-place__notice">
          Please choose a shorter place name
        </div>
      )}
    </div>
  );
};

export default AddPlace;
