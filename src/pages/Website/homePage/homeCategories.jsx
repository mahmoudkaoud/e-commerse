import { useEffect, useState } from "react"
import { Axios } from "../../../Api/Axios/axios"
import { CAT } from "../../../Api/api"
import { useNavigate } from "react-router-dom"


export default function HomeCategories(){

    const [categories , setCategories] = useState([])
    const nav = useNavigate();

    useEffect(() => {
        Axios.get(`/${CAT}`)
        .then((data) => {
            setCategories(data.data)
        })
        .catch((err) => console.log(err))
    } , [])
    
    return(
        <div>
            {/* button to the back */}
            <button
                onClick={() => nav(-1)}
                className="ml-4 px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition duration-300 font-semibold"
            >   
                Back
            </button>
            {/* show the Categories */}
            <div className="flex flex-col md:flex justify-center mt-5 space-x-4 ">
                {categories.map((category , index) => 
                <div className="flex">
                    <a key={index} className="text-black hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium no-underline cursor-pointer">
                        {category.title}
                    </a>
                    <img src={category.image} alt="" className="w-10"/>
                </div>
                )}
            </div>  
        </div>
    )
}