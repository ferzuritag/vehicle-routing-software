import { LocationType } from '@/interfaces';
import L from 'leaflet'

export const getMarkerIconByType = (type: string, typesArray: LocationType[]= []) => {
    const nameArr = [
        "red",
        "blue",
        "green",
        "gold"
    ]
    const index = typesArray.findIndex((item) =>  item.key === type)
    let name = nameArr[index];

    if (index == -1) {
        name = "black"
    }


    const marker = new L.Icon({
        iconUrl: `/img/marker-icon-2x-${name}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    return marker;
}