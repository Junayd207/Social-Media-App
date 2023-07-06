import User from "./User"
import { useUsers } from "../hooks/users";
import "./UsersList.css"

export default function UsersList(){
    const { users, isLoading } = useUsers();

    if (isLoading) return "Loading..."

    let sortedArr = users
    sortedArr.sort((a,b) => {
        const nameA = a.username.toLowerCase()
        const nameB = b.username.toLowerCase()

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    })

    return(
        <div className="allusers-container">
            <h1 className="allusers-title">All Users</h1>
            <div className="userslist-container">
                {sortedArr?.map(user => (
                    <User user={user} key={user.id}/>
                ))}
            </div>
        </div>
    )
}