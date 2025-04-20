import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"
import { Axios } from "../../../Api/Axios/axios";
import { CAT } from "../../../Api/api";

import all from "../../../../public/all.jpg"

export default function CategoriesLinks(){
    const [loading , setLoading] = useState(true)
    const [categories, setCategories] = useState([]);

    // get all the Categories to put them in the home Page
    useEffect(() => {
        Axios.get(`/${CAT}`)
        .then((data) => {
            setCategories(data.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }, []);

    return(
        <div className="hidden md:flex flex-wrap mt-2 gap-4 max-w-full justify-start overflow-hidden mb-12">
            {loading ?
                (
                    <div className="flex">
                        {Array.from({length: 12}).map((_ , index) => <div key={index} className="m-4">
                            <Skeleton height="30px" width="70px" className="px-3 py-2 rounded-md whitespace-nowrap"/>
                        </div>)}
                    </div>
                ) : (categories.slice(-10).map((category) => 
                    <div className="flex flex-col items-center mx-2 cursor-pointer">
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md">
                            <img src={category.image} alt={category.title} className="w-20 h-20 object-contain" />
                        </div>
                        <a
                            key={category.id}
                            className="text-gray-700 hover:text-blue-500 mt-2 text-xs font-medium text-center no-underline"
                        >
                            {category.title.slice(0, 10)}
                        </a>
                    </div>
                    )   
                )
            }
            {loading ?
                (
                    <div></div>
                ) : (
                <Link 
                className="text-gray-900 hover:text-blue-500 rounded-md text-sm font-medium no-underline cursor-pointer whitespace-nowrap flex flex-col justify-start items-center"
                to="/homeCategories"
                >
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md">
                        <img src={all} className="w-20 h-20 object-contain rounded-full"/>
                    </div>
                    <p>
                        Show All
                    </p>
                </Link>
                )
            }
    </div>
    )
}