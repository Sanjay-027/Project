import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { setUser } from "../../../redux/authSlice.js";



const Navbar = () => {
  // let [user, setUser] = useState(false);
const {user}=useSelector(store=>store.auth);
const dispatch = useDispatch();
const navigate = useNavigate();
 const logoutHandler = async()=>{
  try{
const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
if(res.data.success){
  dispatch(setUser(null));
  navigate("/");
  toast.success(res.data.message)
}
  }catch(error){
    console.log(error);
    toast.error(error.response.data.message)
    
  }
 }
  return (
    <div className="bg-primary text-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            CareerWave
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
          {
            user && user.role === "recruiter" ?(
              <>
               <li><Link to="/admin/companies">Companies</Link></li>
               <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ):(
              <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              <li><Link to="/Browse">Browse</Link></li>
              </>
            )
          }
           
          </ul>
          {!user ? (
            <div className="flex itmes-center gap-2">
             <Link to="/login"> <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Login</Button></Link>
             <Link to="/signup"><Button className="bg-secondary hover:bg-secondary-600 text-white">
                Signup
              </Button></Link> 
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/10 flex items-center gap-2">
                  <User2 className="w-5 h-5" />
                  <span>{user?.fullName}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white shadow-lg">
                <div className="pb-3 border-b border-gray-200">
                  <h4 className="font-semibold text-textDark text-lg">{user?.fullName}</h4>
                  <p className="text-sm text-textSubtle mt-1">
                   {user?.email}
                  </p>
                  <p className="text-xs text-textSubtle mt-1">
                   {user?.role === "recruiter" ? "Recruiter" : "Job Seeker"}
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-3">
                  {
                    user && user.role === "student" && (
                      <Link to="/profile" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">
                        <User2 className="w-4 h-4 text-primary" />
                        <span className="text-textDark font-medium">View Profile</span>
                      </Link>
                    )
                  }
                 
                  <button onClick={logoutHandler} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
                    <LogOut className="w-4 h-4 text-primary" />
                    <span className="text-textDark font-medium">Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
