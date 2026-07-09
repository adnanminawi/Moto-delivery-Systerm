"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DriverProfilePage() {
  const params = useParams();
  const id = params.id;

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedCurrentLat, setEditedCurrentLat] = useState("");
  const [editedCurrentLng, setEditedCurrentLng] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  useEffect(() => {
    async function fetchDriver() {
      try {
        const response = await fetch(`/api/drivers/${id}`);
        const data = await response.json();

        const profile = data.driver_Profile?.[0] || null;

        setDriver(profile);

        if (profile) {
          setEditedName(profile.name || "");
          setEditedPhone(profile.phone || "");
          setEditedStatus(profile.status || "");
          setEditedCurrentLat(profile.current_lat || "");
          setEditedCurrentLng(profile.current_lng || "");
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if(id){
      fetchDriver();
    }

  }, [id]);


  const handleSave = async () => {
    try {

      const response = await fetch(`/api/drivers/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:editedName,
          phone:editedPhone,
          status:editedStatus,
          current_lat:editedCurrentLat,
          current_lng:editedCurrentLng
        })
      });


      const data = await response.json();


      if(!response.ok){
        throw new Error(data.error);
      }


      setDriver({
        ...driver,
        name:editedName,
        phone:editedPhone,
        status:editedStatus,
        current_lat:editedCurrentLat,
        current_lng:editedCurrentLng
      });


      setIsEditing(false);

      setPopupTitle("Success");
      setPopupMessage("Driver updated successfully!");
      setShowPopup(true);


    }catch(error){

      console.log(error);

      setPopupTitle("Error");
      setPopupMessage("Failed to update driver.");
      setShowPopup(true);

    }
  };



  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg font-bold text-gray-600 animate-pulse">
          Loading Driver Profile...
        </p>
      </div>
    )
  }



  if(!driver){
    return(
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-xl font-bold text-gray-800">
            Driver not found
          </h2>
        </div>
      </div>
    )
  }




return(
<>
{/* POPUP */}

{
showPopup && (

<div className="
fixed inset-0
bg-black/40
backdrop-blur-sm
flex
items-center
justify-center
z-50
">

<div className="
bg-white
rounded-3xl
p-8
w-[350px]
shadow-2xl
text-center
">


<div className="
w-20
h-20
mx-auto
rounded-full
bg-yellow-400
flex
items-center
justify-center
text-4xl
animate-bounce
">
✓
</div>


<h2 className="
text-3xl
font-black
text-gray-800
mt-5
">
{popupTitle}
</h2>


<p className="
text-gray-500
mt-3
">
{popupMessage}
</p>


<button
onClick={()=>setShowPopup(false)}
className="
mt-6
px-8
py-2
rounded-xl
bg-yellow-400
font-bold
hover:scale-105
transition
"
>
OK
</button>


</div>

</div>

)
}




<div className="
min-h-screen
bg-gray-100
flex
items-center
justify-center
p-6
">


<div className="
w-full
max-w-3xl
bg-white
rounded-[25px]
shadow-xl
overflow-hidden
border
border-gray-200
">


{/* HEADER */}

<div className="
bg-gradient-to-r
from-yellow-400
to-amber-500
p-6
">


<div className="
flex
flex-col
md:flex-row
items-center
gap-5
">


<div className="
w-24
h-24
rounded-full
bg-white
flex
items-center
justify-center
text-4xl
font-black
text-yellow-500
shadow-lg
">

{editedName.charAt(0).toUpperCase()}

</div>



<div className="
text-center
md:text-left
">


<h1 className="
text-3xl
font-black
text-white
">

{driver.name}

</h1>


<p className="
text-white/90
text-sm
mt-1
">

Driver ID: #{driver.id}

</p>



<span className={`
inline-flex
mt-3
px-4
py-1
rounded-full
text-sm
font-semibold

${
driver.status==="online"
?
"bg-green-100 text-green-700"
:
"bg-orange-100 text-orange-700"
}

`}>

● {driver.status}

</span>



</div>


</div>


</div>






{/* CONTENT */}

<div className="p-6">


<h2 className="
text-2xl
font-black
text-gray-800
mb-6
">

Driver Information

</h2>



<div className="
grid
md:grid-cols-2
gap-4
">


<InfoCard
title="Full Name"
value={driver.name}
editable={isEditing}
editedValue={editedName}
setEditedValue={setEditedName}
/>



<InfoCard
title="Phone Number"
value={driver.phone}
editable={isEditing}
editedValue={editedPhone}
setEditedValue={setEditedPhone}
/>



<InfoCard
title="Status"
value={driver.status}
editable={isEditing}
editedValue={editedStatus}
setEditedValue={setEditedStatus}
/>



<InfoCard
title="Current Latitude"
value={driver.current_lat || "Not Available"}
editable={isEditing}
editedValue={editedCurrentLat}
setEditedValue={setEditedCurrentLat}
/>



<InfoCard
title="Current Longitude"
value={driver.current_lng || "Not Available"}
editable={isEditing}
editedValue={editedCurrentLng}
setEditedValue={setEditedCurrentLng}
/>



</div>





<div className="
mt-8
flex
justify-end
gap-3
">


{
isEditing ?

<>

<button
onClick={()=>{
setIsEditing(false);
setEditedName(driver.name);
setEditedPhone(driver.phone);
setEditedStatus(driver.status);
setEditedCurrentLat(driver.current_lat);
setEditedCurrentLng(driver.current_lng);
}}
className="
px-6
py-2
rounded-xl
border
text-gray-700
font-bold
hover:bg-gray-100
"
>

Cancel

</button>


<button
onClick={handleSave}
className="
px-6
py-2
rounded-xl
bg-yellow-400
font-bold
hover:scale-105
transition
"
>

Save

</button>

</>


:

<>

<button
onClick={()=>setIsEditing(true)}
className="
px-6
py-2
rounded-xl
bg-yellow-400
font-bold
hover:scale-105
transition
"
>

Edit Driver

</button>



<button
onClick={()=>window.history.back()}
className="
px-6
py-2
rounded-xl
border
font-bold
hover:bg-gray-100
"
>

← Back

</button>


</>

}



</div>


</div>


</div>


</div>


</>

)

}





function InfoCard({
title,
value,
editable,
editedValue,
setEditedValue
}){


return(

<div className="
bg-gray-50
border
border-gray-200
rounded-2xl
p-4
shadow-sm
hover:shadow-lg
hover:-translate-y-1
transition
">


<p className="
text-gray-500
text-xs
uppercase
mb-2
">

{title}

</p>


{
editable ?

<input
value={editedValue}
onChange={(e)=>setEditedValue(e.target.value)}
className="
w-full
border
rounded-xl
px-3
py-2
text-gray-800
outline-none
focus:border-yellow-400
"
/>


:

<h3 className="
text-lg
font-bold
text-gray-900
">

{value}

</h3>

}



</div>

)

}