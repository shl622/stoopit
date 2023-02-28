import { Wrapper } from "@googlemaps/react-wrapper";
import FullMap from "./FullMap";

export default function Map(props){
    
    return(
        <Wrapper apiKey={"AIzaSyCHidGyCom_sk7-LfSvSUB-jt9l1tQLvpQ"}>
            <FullMap center={props.center || {lat: 40.7309, lng: -73.9973}} />
        </Wrapper>
    )
}
