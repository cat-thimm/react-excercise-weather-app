import { Place } from "../../types/app-types";

export const addPlace = (setPlaces: (place: Place[]) => void, place: Place, places: Place[]) => {
    const newPlaces = [...places, place];
    setPlaces(newPlaces);
    localStorage.setItem("places", JSON.stringify(newPlaces));
};

export const changePlace = (setPlaces: (place: Place[]) => void, place: Place, places: Place[]) => {
    const index = places.findIndex((x) => x.id === place.id);
    if (index < 0) {
        return;
    }
    let newPlaces = [...places];
    newPlaces[index] = { ...newPlaces[index], place: place.place };
    setPlaces(newPlaces);
    localStorage.setItem("places", JSON.stringify(newPlaces));
};

export const deletePlace = (setPlaces: (place: Place[]) => void, place: Place, places: Place[]) => {
    const newPlaces = places.filter((p) => p.id !== place.id);
    setPlaces(newPlaces);
    localStorage.setItem("places", JSON.stringify(newPlaces));
};
