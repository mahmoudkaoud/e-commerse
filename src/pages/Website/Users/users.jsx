import { USER, USERS } from "../../../Api/api"
import { useEffect, useState } from "react"
import { Axios } from "../../../Api/Axios/axios"
import ShowTable from "../../../components/Table"

export default function Users(){
    const [users , setUsers] = useState([])
    const [currentUser , setCurrentUser] = useState("")
    const [page , setPage] = useState(1)
    const [limit , setLimit] = useState(3)
    const [total , setTotal] = useState(0)
    const [loading , setLoading] = useState(false)


    useEffect(() => {
        Axios.get(`${USER}`).then((res) => setCurrentUser(res.data))
    } , [])

    async function handleDelete(id){
        try{
            const res = await Axios.delete(`${USER}/${id}`)
            setUsers((prev) => prev.filter((item) => item.id !== id))
            console.log(res)
        }catch(err){
            console.log(err)
        } 
    }

    useEffect(() => {
        setLoading(true)
        Axios.get(`/${USERS}?limit=${limit}&page=${page}`, {
        }).then((data) => {
            setUsers(data.data.data)
            setTotal(data.data.total)
            console.log(data.data)
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    } , [limit ,page])

    const header = [
        // {
        //     key: "id",
        //     name: "id"
        // },
        {
            key: "name",
            name: "name"
        },
        {
            key: "email",
            name: "email"
        },
        {
            key: "role",
            name: "role"
        },
        {
            key: "created_at",
            name: "created_at"
        },
        {
            key: "updated_at",
            name:"Last Login"
        },
    ]

    return (
        <>
            <ShowTable header={header} data={users} delete={handleDelete} currentUser={currentUser} limit={limit} setLimit={setLimit} page={page} setPage={setPage} loading={loading} total={total} search={"name"} searchLink={USER}/>
        </>
    );
    
}