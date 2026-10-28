import React from "react";
import { useState } from "react";
import AddUsers from "../components/AddUsers";
import { User, ShieldCheck, UserRoundCheck } from "lucide-react"
function Users() {
    const [showForm, setShowForm] = useState(false);
    return (
        <div className="min-h-screen w-full md:p-4 bg-green-950">
            <div className=" flex flex-col gap-4  rounded-2xl p-5">

                <div className="grid md:grid-cols-2 gap-6 md:gap-4  bg-green-50  w-full h-fit md:min-h-[13vh] rounded-2xl">
                    <div className="rounded-2xl pl-10 pt-5">
                        <h1 className="text-xl text-green-950">USER  MANAGEMENT</h1>
                        <h1 className="text-3xl font-bold text-green-950 pt-2">MANAGE USERS</h1>
                    </div>
                    <div className=" flex flex-col  md:flex-row items-center gap-3 px-4 pb-5 md:pb-0  rounded-2xl md:pt-5 ">
                        <input className="w-3/4 md:w-3/5 h-1/2 rounded-2xl bg-white pl-5 border-2 border-green-950 focus:outline-none" type="text" placeholder=" 🔎 search users..." />
                        <button className=" w-3/4 md:w-1/4 h-1/2 rounded-2xl bg-white cursor-pointer border-2 border-green-950 focus:outline-none" onClick={() => setShowForm(!showForm)}>👤 Add Users ↓</button>

                    </div>

                </div>

                {showForm && <AddUsers onClose={() => setShowForm(false)} />}




                <div className="grid md:grid-cols-4 gap-4 w-full  rounded-2xl">

                    <div className="flex items-center justify-between bg-white  rounded-2xl h-[10vh] md:h-[12vh] p-5">
                        <div>
                            <h1 className="text-xl">Total Users</h1>
                            <h1 className="text-2xl font-bold">0</h1>
                        </div>
                        <div className="flex items-center justify-center shrink-0 bg-green-800 rounded-xl p-4">
                            <User size={40} color="white" />

                        </div>

                    </div>


                    <div className="flex items-center justify-between bg-white  rounded-2xl h-[10vh] md:h-[12vh] p-5">
                        <div>
                            <h1 className="text-xl">Admin</h1>
                            <h1 className="text-2xl font-bold">0</h1>
                        </div>
                        <div className=" flex items-center justify-center shrink-0 bg-green-800 rounded-xl p-4">
                            <ShieldCheck size={40} color="white" />

                        </div>

                    </div>
                    <div className="flex items-center justify-between bg-white  rounded-2xl h-[10vh] md:h-[12vh] p-5">
                        <div>
                            <h1 className="text-xl">Customers</h1>
                            <h1 className="text-2xl font-bold">0</h1>
                        </div>
                        <div className=" flex items-center justify-center shrink-0  bg-green-800 rounded-xl p-4">
                            <User size={40} color="white" />

                        </div>

                    </div>
                    <div className="flex items-center justify-between bg-white  rounded-2xl h-[10vh] md:h-[12vh] p-5">
                        <div>
                            <h1 className="text-xl">Verified</h1>
                            <h1 className="text-2xl font-bold">0</h1>
                        </div>
                        <div className=" flex items-center justify-center shrink-0 bg-green-800 rounded-xl p-4">
                            <UserRoundCheck size={40} color="white" />

                        </div>

                    </div>
                </div>

                <div className="flex flex-col bg-white w-full   rounded-2xl">
                    <div className="grid grid-cols-4 place-items-center p-2 w-full bg-green-50  rounded-t-2xl border-3 border-green-950">
                        <h1 className="font-bold">User</h1>
                        <h1 className="font-bold">Role</h1>
                        <h1 className="font-bold">Verified</h1>
                        <h1 className="font-bold">Action</h1>

                    </div>
                    <div className="w-full bg-white rounded-b-2xl border-3 border-green-950 text-center p-15">
                        <h2 className="text-xl font-bold">No users found</h2>
                    </div>

                </div>

            </div>
        </div>
    )

}
export default Users;