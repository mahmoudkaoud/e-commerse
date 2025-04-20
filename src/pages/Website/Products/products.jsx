import { useEffect, useState } from "react"
import { Axios } from "../../../Api/Axios/axios"
import ShowTable from "../../../components/Table"
import { PRO, pro } from "../../../Api/api"

export default function Porducts(){
    const [products , setProducts] = useState([])
    const [page , setPage] = useState(1)
    const [limit , setLimit] = useState(3)
    const [total , setTotal] = useState(0)
    const [loading , setLoading] = useState(false)


    async function handleDelete(id){
        try{
            const res = await Axios.delete(`${pro}/${id}`)
            setProducts((prev) => prev.filter((item) => item.id !== id))
            console.log(res)
        }catch(err){
            console.log(err)
        } 
    }

    useEffect(() => {
        setLoading(true)
        Axios.get(`/${PRO}?limit=${limit}&page=${page}`, {
        }).then((data) => {
            setProducts(data.data.data)
            setTotal(data.data.total)
            console.log(data.data)
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    } , [limit , page])

    const header = [
        // {
        //     key: "id",
        //     name: "id"
        // },
        {
            key: "title",
            name: "title"
        },
        {
            key: "description",
            name: "description"
        },
        {
            key: "price",
            name: "price"
        },
        {
            key: "discount",
            name: "discount"
        },
        {
            key: "images",
            name: "images"
        },
        {
            key: "created_at",
            name: "created_at"
        },
        {
            key: "updated_at",
            name: "updated_at"
        },
        {
            key: "stock",
            name: "stock"
        },
    ]

    return (
        <>
            <div>
                <ShowTable header={header} data={products} delete={handleDelete} limit={limit} setLimit={setLimit} page={page} setPage={setPage} loading={loading} total={total} search={"title"} searchLink={pro}/>
            </div>
        </>
    );
    
}