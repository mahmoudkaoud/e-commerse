import React, { useContext, useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Axios } from "../../../../../Api/Axios/axios";
import { pro } from "../../../../../Api/api";
import { useParams } from "react-router-dom";
import { faCartShopping, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import { Cart } from "../../../Context/cart";
import PlusAndMinus from "../plusAndMinus";

export default function SingleProduct(){
    const [product , setProduct] = useState([])
    const [productImages , setProductImages] =  useState([])
    const [loading , setLoading] = useState(true)
    const {id} = useParams()

    const [count , setCount] = useState(0)
    const cart = useContext(Cart)

    console.log(count)
    
    useEffect(() => {
        Axios.get(`${pro}/${id}`)
        // .then((data) => console.log(data.data))
        .then((data) => {
            setProduct(data.data[0])
            setProductImages(data.data[0].images.map((img) => {
                return {
                    original: img.image,
                    thumbnail: img.image,
                }
            }))
        })
        .finally(() => setLoading(false))
    } , [])

    const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    ];

    const roundStarts = Math.round(product.rating)
    const stars = Math.min(roundStarts , 5)
    const solidStarts = Array.from({length: stars}).map((_ , index) => <FontAwesomeIcon key={index} icon={faStarSolid} className="text-yellow-500"/>)
    const regularStarts = Array.from({length: 5 - stars}).map((_ , index) => <FontAwesomeIcon key={index} icon={faStarRegular} className="text-yellow-500"/>)
    
    function handleSave(){
        const getProducts = JSON.parse(localStorage.getItem("product")) || []
        console.log(getProducts)

        const existProducts = getProducts.findIndex((pro) => pro.id === +id)
        console.log(existProducts)

        if(existProducts !== -1){
            if(getProducts[existProducts].count){
                console.log(count)
                getProducts[existProducts].count += count
            }else{
                getProducts[existProducts].count = count
            }
        }else{
            if(count > 1){
                product.count = count
            }
            getProducts.push(product)
        }

        localStorage.setItem("product" , JSON.stringify(getProducts))
        cart.setCart((prev) => !prev)
    }

    return(
        <div>
            {
                loading ? (  
                    <div className="flex flex-wrap m-10 justify-center items-center">
                        <div className="flex flex-col">
                            <div>
                                <Skeleton height="250px" width="370px" />
                            </div>
                            <div className="flex gap-3">
                            <Skeleton height="70px" width="113px" />
                            <Skeleton height="70px" width="113px" />
                            <Skeleton height="70px" width="113px" />
                            </div>
                        </div>
                        <div
                        className="cursor-pointer group overflow-hidden p-4 duration-500 hover:duration-500 relative w-64 rounded-xl m-3 no-underline h-fit"
                        // className="cursor-pointer group overflow-hidden p-4 duration-500 hover:duration-500 relative w-64 bg-slate-50 shadow-inner rounded-xl m-3 no-underline h-fit"
                        >
                            <span className="text-gray-900 font-bold text-xl italic"><Skeleton height="30px" width="100px" /></span>
                            <p className="text-gray-400 my-2"><Skeleton height="30px" width="200px" /></p>
                            <p className="text-gray-900">
                                <Skeleton height="30px" width="250px" />
                            </p>
                            <p className=" text-slate-100 rounded-full w-fit p-2 font-bold"><Skeleton height="30px" width="50px" /></p>
                            <img src={product.image} className="w-32" loading="lazy"/>
                            <hr className="text-gray-800 w-full" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex">
                                            {Array.from({length: 5}).map((_ , index) => <div key={index} className="col-lg-3 col-md-6 col-12 mt-2">
                                        <Skeleton height="20px" width="20px" />
                                    </div>)}
                                    </div>
                                    <div className="flex mt-4">
                                        <p className="mr-3 text-2xl text-blue-700"><Skeleton height="20px" width="50px" /></p>
                                        <del className="text-gray-900"><Skeleton height="20px" width="40px" /></del>
                                    </div>
                                </div>
                                <Skeleton height="50px" width="50px" />
                            </div>
                        </div>
                    </div>
                ) : (
                <div className="flex flex-wrap m-10 justify-center items-center">
                    <div className="w-96 mt-8">
                        <ImageGallery items={productImages.length !== 0 ? productImages : images} />
                    </div>
                    <div
                    className="cursor-pointer group overflow-hidden p-4 duration-500 hover:duration-500 relative w-64 rounded-xl m-3 no-underline h-fit"
                    // className="cursor-pointer group overflow-hidden p-4 duration-500 hover:duration-500 relative w-64 bg-slate-50 shadow-inner rounded-xl m-3 no-underline h-fit"
                    >
                        <span className="text-gray-900 font-bold text-xl italic">{product.title}</span>
                        <p className="text-gray-400 my-2">{product.About}</p>
                        <p className="text-gray-900">
                            {product.description}
                        </p>
                        <p className="bg-blue-700 text-slate-100 rounded-full w-fit p-2 font-bold">Sale</p>
                        <img src={product.image} className="w-32" loading="lazy"/>
                        <hr className="text-gray-800 w-full" />
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex">
                                    {solidStarts}
                                    {regularStarts}
                                </div>
                                <div className="flex mt-4">
                                    <p className="mr-3 text-2xl text-blue-700">{product.price}$</p>
                                    <del className="text-gray-900">{product.discount}$</del>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <PlusAndMinus setCount={(count) => setCount(count)}/>
                            <FontAwesomeIcon onClick={handleSave} icon={faCartShopping} className="text-gray-900 text-3xl"/>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    )
}