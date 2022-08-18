import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import DataContext from "./DataContext";

function Sea() {


    const { seaId } = useParams();
    const { seaPlaners } = useContext(DataContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(seaPlaners.find(s => s.id === parseInt(seaId)));
    }, [seaPlaners, seaId]);

    if (null === data) {
        return null;
    }

    return (
        <h2 style={{color:data.color}}>Sea Page {data.name}</h2>
    );

}
export default Sea;