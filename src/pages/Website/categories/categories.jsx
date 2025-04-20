import { useEffect, useState } from "react"
import { Axios } from "../../../Api/Axios/axios"
import ShowTable from "../../../components/Table"
import { cat, CAT } from "../../../Api/api"
import TranseFormDate from "../../../helpers/transFormDate"

export default function Categories(){
    const [categories , setCategories] = useState([])
    const [page , setPage] = useState(1)
    const [limit , setLimit] = useState(3)
    const [total , setTotal] = useState(0)
    const [loading , setLoading] = useState(false)

    TranseFormDate("2025-04-06T21:01:55.000000Z")

    async function handleDelete(id){
        try{
            const res = await Axios.delete(`${cat}/${id}`)
            setCategories((prev) => prev.filter((item) => item.id !== id))
            console.log(res)
        }catch(err){
            console.log(err)
        } 
    }

    useEffect(() => {
        setLoading(true)
        Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
        .then((data) => {
            setCategories(data.data.data)
            setTotal(data.data.total)
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
            key: "image",
            name: "image"
        },
        {
            key: "created_at",
            name: "created_at"
        },
        {
            key: "updated_at",
            name: "updated_at"
        },
    ]

    return (
        <>
            <div>
                <ShowTable header={header} data={categories} delete={handleDelete} limit={limit} setLimit={setLimit} page={page} setPage={setPage} loading={loading} total={total} search={"title"} searchLink={cat}/>
            </div>
        </>
    );
    
}