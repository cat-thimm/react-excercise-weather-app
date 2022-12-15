import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import { Place } from "../../types/app-types";
import {changePlace, deletePlace} from './Overview.helper'

interface PlaceListProps {
  places: Place[],
  setPlaces: (places: Place[]) => void
  onChangeSelectedPlace: (place: string) => void
}

const PlaceList = ({
  places,
  setPlaces,
  onChangeSelectedPlace
}: PlaceListProps) => {
  const [edit, setEdit] = useState(false);
  const favoritePlace = localStorage.getItem("userFavoritePlace");

  const changeLatestPlace = (place: string) => {
    onChangeSelectedPlace(place);
  };

  return (
    <div className="column place-list">
      <div className="place-list__header">Your places</div>
      {places.map((place) => {
        return (
          <div className="row" key={place.id}>
            <div className="place-list__entry row">
              {edit ? (
                <input
                  className="place-list__input"
                  value={place.place}
                  onChange={(e) =>
                    changePlace(setPlaces, { id: place.id, place: e.target.value }, places)
                  }
                />
              ) : (
                <Link
                  to={"/places/" + place.place}
                  className="place-list__link place-list__entry-text"
                  onClick={(e) => changeLatestPlace(place.place)}
                >
                  {place.place}
                </Link>
              )}
              {!edit && (
                <AiOutlineEdit
                  className="place-list__icon"
                  onClick={() => setEdit(!edit)}
                />
              )}
              {edit && (
                <AiOutlineCheck
                  className="place-list__icon"
                  onClick={() => setEdit(!edit)}
                />
              )}
            </div>
            <TiDeleteOutline
              className="place-list__icon place-list__icon-delete"
              onClick={() => deletePlace(setPlaces, place, places)}
            />
          </div>
        );
      })}
      <div className="column">
        <div className="place-list__header">Favourite Place</div>
        <div className="row place-list__entry row">
          <AiOutlineHeart className="place-list__icon" />
          <Link
            to={"/places/" + favoritePlace}
            className="place-list__entry-text"
          >
            {favoritePlace}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceList;
