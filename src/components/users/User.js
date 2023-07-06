import defaultPhoto from "../../images/default_pfp.jpg"
import"./User.css"

export default function User({user}){
    return(
        <div className="user-container">
            <img className="user-profile-photo" src={user.avatar ? user.avatar : defaultPhoto} alt="Profile Image"/>
            <h1 className="user-username">@{user.username}</h1>
            <button className="view-profile-button" onClick={async() => {
                window.location.href=`/profile/${user.id}`
            }}>View Profile</button>
        </div>
    )
}