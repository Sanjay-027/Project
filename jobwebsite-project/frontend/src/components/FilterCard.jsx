import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../redux/jobSlice.js'

const filterData = [
    {
        filterType:"Location",
        array:["Delhi NCR","Noida","Pune","Mumbai"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer","Backend Developer","FullStack Developer"]
    },
    {
        filterType:"Salary",
        array:["0-40k","42-1akh","1lakh to 5 lakh"]
    }

  
]

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        location: "",
        industry: "",
        salary: ""
    });
    const dispatch = useDispatch();
    
    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...selectedFilters, [filterType.toLowerCase()]: value };
        setSelectedFilters(newFilters);
        
        // Combine all selected filters into a search query
        const activeFilters = Object.values(newFilters).filter(v => v !== "" && v !== "all");
        dispatch(setSearchedQuery(activeFilters.join(" ")));
    }

    return (
        <div className='w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 sticky top-5'>
            <h1 className='font-bold text-lg text-primary mb-4'>Filter Jobs</h1>
            <hr className='mb-4 border-gray-200'/>
            <div className="space-y-4">
                {filterData.map((data, index) => {
                    const filterKey = data.filterType.toLowerCase();
                    return (
                        <div key={index} className="space-y-2">
                            <Label className='font-semibold text-base text-textDark'>{data.filterType}</Label>
                            <Select 
                                value={selectedFilters[filterKey] || undefined} 
                                onValueChange={(value) => handleFilterChange(data.filterType, value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={`Select ${data.filterType}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    {data.array.map((item, idx) => (
                                        <SelectItem key={idx} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FilterCard
