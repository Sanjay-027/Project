import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../../utils/constant.js'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../../redux/authSlice.js'

import { Loader2 } from 'lucide-react'


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const {loading,user}=useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    
  };
  
  const submitHandler = async(e)=>{
    e.preventDefault();
    
    try{
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if(res.data.success){
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message)
      }
    }catch(error){
  console.log(error);
  toast.error(error.response.data.message)
  
    }finally{
      dispatch(setLoading(false))
    }
    
  }
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user, navigate])
  return (
    <div className="bg-bgLight min-h-screen">
      <Navbar/>
      <div className="flex items-center justify-center max-w-7xl mx-auto py-10">
        <form onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-8 my-10"
        >
          <h1 className="font-bold text-2xl text-primary mb-6">Log in</h1>
          <div className="mb-4">
            <Label className="text-textDark font-medium">Email</Label>
            <Input type="email" placeholder="aanchalmittal@gmail.com" name="email" value={input.email} onChange={changeEventHandler} className="mt-1" />
          </div>
          <div className="mb-4">
            <Label className="text-textDark font-medium">Password</Label>
            <Input type="password" placeholder="enter password" name="password" value={input.password} onChange={changeEventHandler} className="mt-1" />
          </div>
          <div className="mb-6">
            <Label className="text-textDark font-medium mb-2 block">I am a:</Label>
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
              <Input 
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer w-4 h-4"
                />
                <Label htmlFor="r1" className="text-textDark">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input 
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer w-4 h-4"
                />
                <Label htmlFor="rr" className="text-textDark">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full bg-secondary hover:bg-secondary-600"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button>: <Button type="submit" className="w-full bg-secondary hover:bg-secondary-600">Login</Button>
          }
         
          <p className="text-sm text-textSubtle mt-4 text-center"> Don't have an account? <Link to="/signup" className="text-secondary font-medium hover:underline">Signup</Link></p>
          </form>
          </div>
    </div>
  )
}

export default Login
