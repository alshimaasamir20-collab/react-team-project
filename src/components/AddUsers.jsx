import { UserPlus } from "lucide-react";
import { X } from "lucide-react";
import { Asterisk } from "lucide-react";
import { useState } from "react";
function AddUsers({ onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    })
    return (
        <div>
            <div className="flex flex-col  justify-start  bg-green-50 h-fit w-full rounded-2xl">


                <div className="flex flex-row justify-between bg-green-50 h-1/3 rounded-t-2xl p-6 border-b-2 border-green-950">

                    <div className="flex flex-cols-2 justify-start gap-3 w-1/2 ">
                        <div className="bg-green-800 rounded-lg p-2 flex items-center justify-center h-10 w-10">
                            <UserPlus size={20} color="white" />
                        </div>
                        <div className=" ">
                            <h1 className="text-lg text-green-950 font-bold">Create New User
                            </h1>
                            <h1 className="text-green-950">Fill in the details below to add a new user</h1>
                        </div>
                    </div>

                    <button onClick={onClose} className="bg-green-800 rounded-lg p-2 hover:bg-green-700 flex items-center justify-center h-10 w-10">
                        <X size={20} color="white" />
                    </button>
                </div>



                <div className="flex flex-col md:flex-row justify-between w-full min-h-fit bg-white flex-wrap gap-2 border border-b-3 border-green-950 p-5">
                    <div className="flex-1">
                        <label className="flex flex-col gap-2" htmlFor="">
                            <div className="flex items-center ">
                                NAME
                                <Asterisk size={14} color="red" />
                            </div>
                            <input value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="p-2 w-full min-w-0 border border-green-950 rounded-lg focus:border-green-800 focus:border-2 focus:outline-none" type="text" placeholder="enter your nname" />
                        </label>
                    </div>
                    <div className="flex-1">
                        <label className="flex flex-col gap-2" htmlFor="">
                            <div className="flex items-center ">
                                EMAIL
                                <Asterisk size={14} color="red" />
                            </div>
                            <input value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="p-2 w-full min-w-0 border border-green-950 rounded-lg focus:border-green-800 focus:border-2 focus:outline-none" type="email" placeholder="enter your email" />

                        </label>
                    </div>
                    <div className="flex-1">
                        <label className="flex flex-col gap-2" htmlFor="">
                            <div className="flex items-center ">
                                PASSWORD
                                <Asterisk size={14} color="red" />
                            </div>

                            <input value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                            className="p-2 w-full min-w-0 border border-green-950 rounded-lg focus:border-green-800 focus:border-2 focus:outline-none" type="password" placeholder="enter your password" />
                        </label>
                    </div>
                    <div className="flex-1">
                        <label className="flex flex-col gap-2" htmlFor="">
                            <div className="flex items-center ">
                                PHONE
                              
                            </div>
                            <input value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                            className="p-2 w-full min-w-0 border border-green-950 rounded-lg focus:border-green-800 focus:border-2 focus:outline-none" type="tel" placeholder="enter your phone" />
                        </label>
                    </div>


                </div>



                <div className="flex w-full h-fit items-center justify-between p-5 bg-green-50 rounded-b-2xl ">

                    <div className="flex items-center gap-1">
                        <Asterisk size={14} color="red" /> <h1> Required fields</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => setFormData({
                            ...formData, name: ""  ,  email: "",password: "",phone: ""
                        })} className="bg-green-800 text-lg text-white p-3 rounded-xl">clear</button>
                        <button className="bg-green-800 text-lg text-white p-3 rounded-xl">add users</button>
                    </div>



                </div>
            </div>
        </div>
    )
}


export default AddUsers;