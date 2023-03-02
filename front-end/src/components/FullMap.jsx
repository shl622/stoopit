import { useRef, useEffect,useState } from "react";
import {Stoops} from "../mockdata/db"

//mock function for getting mockdata
//remove later when actual DB is set up
const mockGetStoops = async () =>{
    return new Promise((resolve,reject)=>{
        resolve(Stoops)
    })
}

export default function FullMap({
    center
  }) {
    const ref = useRef();
    const [stoops,setStoops] = useState([])

    useEffect(() => {
      const getStoops = async () =>{
        try{
            const stoops = await mockGetStoops()
            setStoops(stoops)
        }
        catch(err){
            console.log(err)
        }
      }
      getStoops()  
    },[]);

   useEffect(()=>{
    console.log(stoops)
    const map = new window.google.maps.Map(ref.current, {
        center,
        zoom:18,
        disableDefaultUI: true,
        styles: [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                    { visibility: "off" }
            ]
        }
    ]
      });
      new window.google.maps.Marker({
        position: center,
        map,
        title: "Hello World!",
      });
      stoops.map((stoop)=>{
        return new window.google.maps.Marker({
            position: stoop.location,
            map,
            title: stoop.title,
          });
        })
   },[center,stoops]) 
    return <div className="fullMap" ref={ref} id="map" />;
  }