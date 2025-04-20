import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios/axios";
import { LatestSale } from "../../../../Api/api";
import ProductHome from "./productHome";
import Skeleton from 'react-loading-skeleton'

export default function LatestProduct(){

    const [loading , setLoading] = useState(true)
    const [products , setProducts] = useState([])

    useEffect(() => {
        Axios.get(`${LatestSale}`)
        .then((data) => setProducts(data.data))
        .finally(() => setLoading(false))
    } , [])

    return(
        <div className="flex flex-col flex-wrap justify-center items-center">
            <h1>Latest Sale Product</h1>
            <div className="flex flex-wrap justify-center items-center">
                {loading ?
                    (
                        <div className="flex flex-wrap justify-center items-center text-center">
                            {Array.from({length: 5}).map((_ , index) => <div key={index} className="col-lg-3 col-md-6 col-12 mt-2">
                                <Skeleton height="300px" width="200px" />
                            </div>)}
                        </div>
                    ) : (products.slice(0 , 5).map((item , index) => {
                            return <ProductHome key={index} title={item.title} description={item.description} image={item.images[0] && item.images[0].image} price={item.price} discount={item.discount} rating={item.rating} id={item.id}/>
                        })
                    )
                }
            </div>
        </div>
    )
}