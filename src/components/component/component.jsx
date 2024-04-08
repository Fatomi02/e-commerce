import React, {useState, useEffect} from "react";
// import axios from "axios";
import Body from "../body/body";
import Data from "../../data";



const Component = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    // const [error, setError] = useState();
    const [searchValue, setSearchValue] = useState("");


    useEffect(()=> {
      setData(Data);
      setFilteredData(Data);
    }, [])

    // if(error) {
    //     return <h1 className="text-center text-4xl">{error.message}</h1>
    // }  

    const search = (value) => {
        setSearchValue(value);
        let filtered = data;
        if (value !== "") {
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(value.toLowerCase())
            );
        }
        setFilteredData(filtered)
    }



    return (<>
        <nav className="block flex-col">
        <div className="lg:hidden block w-[90%] m-auto"><input type="search" value={searchValue} onChange={(e)=> search(e.target.value)} name="search" id="search" className="w-[100%] border-[0.5px] rounded-2xl bg-gray-200 pl-3 pr-3 text-sm h-10 mt-4" /></div>
         <div className="flex flex-row text-4xl align-middle p-4 pr-8 pl-8 w-[100%] md:w-[98%] mr-auto ml-auto justify-between">
            <div className="cursor-pointer"><h2 className="md:text-4xl text-4xl font-bold font-[Merriweather]">Olaitan</h2></div>
            <div className="lg:flex hidden w-[70%]"><input type="search" value={searchValue} onChange={(e)=> search(e.target.value)} name="search" id="search" className="w-[100%] border-[0.5px] rounded-2xl bg-gray-200 pl-3 pr-3 text-sm h-12 mt-0" /></div>
            <div className="flex flex-row align-top gap-6">
                <button className="bg-blue-800 text-sm pt-3 pb-3 p-4 rounded-3xl m-0 text-white">
                    Open Cart
                </button>
                <div className="w-11 h-11 bg-slate-800 rounded-full">
                </div>
            </div>
         </div>     
         <div className="p-1 pr-8 pl-8 w-[98%] mr-auto ml-auto">
            <ul className="list-none flex flex-row gap-2">
                <li><a href="home"><b>HOME</b></a></li>
                <li><b>/</b></li>
                <li><a href="/house"><b>House and Garden</b></a></li>
                <li><b>/</b></li>
                <li><a href="/home">Furniture</a></li>
            </ul>
         </div>
        </nav>
        <Body search={filteredData} data={data} />
    </>)
}

export default Component;