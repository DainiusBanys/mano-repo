import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import DataContext from "./DataContext";
import randomColor from '../../Functions/randomColor'

function Brand() {

    const { brands } = useContext(DataContext);
    
    const {id} = useParams();
    
    const [brand, setBrand] = useState(null);
    
    useEffect(() => {
        setBrand(brands?.find(b => b.id === parseInt(id)));
    }, [brands, id])
    
        if (null === brand || typeof brand === 'undefined') {
            return null;
        }
    
        return (
            <h2 style={{color: randomColor()}}>{brand.title}</h2>
        )
    
    }
    
    export default Brand;