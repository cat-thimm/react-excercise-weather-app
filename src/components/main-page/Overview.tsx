import { useState } from "react";

import AddPlace from "./AddPlace";
import PlaceList from "./PlaceList";
import { Place } from "../../types/app-types";


interface OverviewProps {
    setSelectedPlace: (place: string) => void
}

const Overview = ({setSelectedPlace}: OverviewProps) => {
  const [places, setPlaces] = useState<Place[]>(
    JSON.parse(localStorage.getItem("places")!) || []
  );


  return (
    <div>
      <AddPlace places={places} setPlaces={setPlaces} />
      <PlaceList
        places={places} setPlaces={setPlaces} onChangeSelectedPlace={setSelectedPlace}
      />
    </div>
  );
};

export default Overview;
