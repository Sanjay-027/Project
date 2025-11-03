import React from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../../redux/jobSlice.js";
import { Code, Wrench, DollarSign, GraduationCap } from "lucide-react";

const categories = [
  { name: "IT & Software", icon: Code },
  { name: "Engineering", icon: Wrench },
  { name: "Finance", icon: DollarSign },
  { name: "Education", icon: GraduationCap },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  
  return (
    <section className="py-12 bg-bgLight">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary mb-8">Popular Job Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                onClick={() => searchJobHandler(cat.name)}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-sm font-semibold text-textDark text-center">{cat.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
