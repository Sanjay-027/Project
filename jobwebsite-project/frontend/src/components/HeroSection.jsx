import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice.js";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch();
  const naviagte = useNavigate();
   const searchJobHandler = ()=>{
dispatch(setSearchedQuery(query))
naviagte("/browse");
   }
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-r from-primary to-primary-600 flex items-center justify-center">
      {/* Background overlay for text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Search Bar */}
          <div className="flex w-full max-w-2xl mx-auto bg-white rounded-md shadow-lg overflow-hidden">
            <input 
              type="text" 
              placeholder="Search for jobs..." 
              onChange={(e)=>setQuery(e.target.value)} 
              className="flex-1 px-6 py-4 text-base outline-none border-none text-textDark" 
            />
            <Button onClick={searchJobHandler} className="bg-secondary hover:bg-secondary-600 text-white px-8 rounded-none">
              <Search className="h-5 w-5 mr-2"/>
              Search
            </Button>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Your next career move starts here
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
