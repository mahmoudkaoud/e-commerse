import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";

export default function ProductHome(props){
    const roundStarts = Math.round(props.rating)
    const stars = Math.min(roundStarts , 5)
    const solidStarts = Array.from({length: stars}).map((_ , index) => <FontAwesomeIcon key={index} icon={faStarSolid} className="text-yellow-500"/>)
    const regularStarts = Array.from({length: 5 - stars}).map((_ , index) => <FontAwesomeIcon key={index} icon={faStarRegular} className="text-yellow-500"/>)

    return(
        <NavLink to={`/product/${props.id}`}
        className="cursor-pointer group overflow-hidden p-4 duration-500 hover:duration-500 relative w-64 bg-slate-50 shadow-inner rounded-xl m-3 no-underline"
        >
            <span className="text-gray-900 font-bold text-xl italic">{props.title}</span>
            <p className="text-gray-900">
                {props.description}
            </p>
            <p className="bg-blue-700 text-slate-100 rounded-full w-fit p-2 font-bold">Sale</p>
            <img src={props.image} className="w-32" loading="lazy"/>
            <hr className="text-gray-800 w-full" />
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex">
                        {solidStarts}
                        {regularStarts}
                    </div>
                    <div className="flex mt-4">
                        <p className="mr-3 text-2xl text-blue-700">{props.price}$</p>
                        <del className="text-gray-900">{props.price - props.discount}$</del>
                    </div>
                </div>
                <FontAwesomeIcon icon={faCartShopping} className="text-gray-900 text-3xl"/>
            </div>
        </NavLink>
    )
}