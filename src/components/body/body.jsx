import React, {useState, useEffect} from "react";
import "./modal.css"
import { Balance } from "../body/balance";

const Body = (props) => {
    let search = props.search;
    let originalData = props.data;

    const [balance, setBalance] = useState()
    const [item, setItem] = useState();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState();
    const [modal, setModal] = useState(false);
    const [getCondition, setGetCondition] = useState("")
    const [getLocation, setGetLocation] = useState("")
    const [getManufacturer, setGetManufacturer] = useState("")
    const [getPrice, setGetPrice] = useState("")
    const [loading, setLoading] = useState(false);
    const [insufficient, setInsufficient] = useState(false);
    const [successful, setSuccessful] = useState(false);

    useEffect(()=> {
        setData(originalData)
    }, [originalData])

    useEffect(()=> {
        setFilteredData(search)
    }, [search])

    useEffect(()=> {
        setBalance(Balance)
    },[])

    const openItemModal = (id) => {
      let item = filteredData.filter((data) => data.id === id);
        setItem(item);
        setModal(true);
        console.log(item)
    }

    const closeModal = () => {
        setModal(false);
    }

    const sortByLowPrice = () => {
        const sortData = [...filteredData];
        sortData.sort((a, b)=> parseFloat(a.price) - parseFloat(b.price))
        setFilteredData(sortData)
    }
    const sortByHighPrice = () => {
        const sortData = [...filteredData];
        sortData.sort((a, b)=> parseFloat(b.price) - parseFloat(a.price))
        setFilteredData(sortData)
    }

    const filtered = (condition, location, manufacture, price) => {
        let filtered = data;
        setGetCondition(condition)
        setGetLocation(location)
        setGetManufacturer(manufacture)
        setGetPrice(price)
        if (location !== "") {
            filtered = filtered.filter(item => item.location === location);
        }

        if (condition !== "") {
            filtered = filtered.filter(item => item.condition === condition);
        }

        if(manufacture !== "") {
            filtered = filtered.filter(item => item.manufacture === manufacture);
        }

        if(price !== "") {
            if(price > 50) {
                filtered = filtered.filter(item => item.price > price)
            }
            else if (price > 20 & price <= 50) {
                filtered = filtered.filter(item => item.price > 20)
                filtered = filtered.filter(item => item.price <= 50)
            }
            else {
                filtered = filtered.filter(item => item.price <= price)
            }

        }

        setFilteredData(filtered);
    }

    const buy = (itemPrice) => {
        setLoading(true);
        setTimeout(()=> {
            setLoading(false);
            if(balance < itemPrice) {
                setInsufficient(true);
                setModal(false);
            }

            if(balance >= itemPrice) {
                let amountRemain = balance - itemPrice;
                setBalance(amountRemain);
                setSuccessful(true)
                setModal(false);
            }

        }, 3000)
    }
    // if(error) {
    //     return <h1 className="text-center text-4xl">{error.message}</h1>
    // }  

    if(loading) {
        return <>
            <div className="modalOverlay h-[100vh] flex flex-row text-center align-middle">
                <h1 className="text-6xl">Loading ...</h1>
            </div>
        </>
    }

    if(insufficient) {
        return <>
            <div className="modalOverlay">
                <div className="modal flex flex-col align-middle justify-center gap-5 h-[50vh] w-[90%] m-auto lg:w-[40%] lg:h-[50vh]">
                    <div className="flex flex-col align-middle justify-center">
                        <h1 className="text-red-800 text-4xl text-center">Insufficient Balance to purchase this Item</h1>
                        <button className="bg-blue-600 p-5 w-[100px] rounded-3xl m-auto mt-16" onClick={()=> setInsufficient(false)}>Okay</button>
                    </div>

                </div>
            </div>
        </>
    }

    if(successful) {
        return <>
            <div className="modalOverlay">
                <div className="modal flex flex-col align-middle justify-center gap-5 h-[50vh] w-[90%] m-auto lg:w-[40%] lg:h-[50vh]">
                    <div className="flex flex-col align-middle justify-center">
                        <h1 className="text-green-800 text-4xl text-center">Thank you for purchasing this Item</h1>
                        <button className="bg-blue-600 p-5 w-[100px] rounded-3xl m-auto mt-16" onClick={()=> setSuccessful(false)}>Okay</button>
                    </div>

                </div>
            </div>
        </>
    }

    return (<>
    <div className="md:text-4xl flex flex-row justify-between m-auto mt-2 mb-2 md:mt-4 md:mb-4 pr-8 pl-8 w-[98%] text-2xl">
        <h1>Furniture</h1>
        <h1 className="mr-6 text-2xl">Balance: ${balance}</h1>
    </div>
    <div className="w-[98%] pr-8 pl-8 m-auto">
        <div className="flex lg:flex-row align-middle flex-col">
         <div className="flex flex-col md:flex-row lg:flex-row align-middle lg:w-[80%] gap-4 lg:gap-10 w-[100%]">
            <span className="text-xl"><b>Filter By</b></span>
            <div className="lg:ml-6 flex md:flex-row gap-3 flex-col">
                <div className="flex flex-row gap-3">
                <select name="condition" onChange={(e) => filtered(e.target.value, getLocation, getManufacturer, getPrice)} id="condition" className="text-md border-[1px] bg-white border-gray-500 pr-3 pl-1 rounded-md h-8 cursor-pointer">
                    <option value="">Condition</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="old">Old</option>
                </select>
                <select name="location" onChange={(e)=> filtered(getCondition, e.target.value, getManufacturer, getPrice)} id="location" className="text-md border-[1px] bg-white border-gray-500 pr-3 pl-1 rounded-md h-8 cursor-pointer">
                    <option value="">Location</option>
                    <option value="ibadan">Ibadan</option>
                    <option value="lagos">Lagos</option>
                    <option value="abuja">Abuja</option>
                </select>
                </div>
                <div className="flex flex-row gap-3">
                <select name="manufacturer" id="manufacture" onChange={(e)=> filtered(getCondition, getLocation, e.target.value, getPrice)} className="text-md border-[1px] bg-white border-gray-500 pr-3 pl-1 rounded-md h-8 cursor-pointer">
                    <option value="">Manufacture</option>
                    <option value="panasonic">Panasonic</option>
                    <option value="cooper">Cooper</option>
                    <option value="philips">Philips</option>
                </select>
                <select name="price" id="price" onChange={(e)=> filtered(getCondition, getLocation, getManufacturer, e.target.value)} className="text-md border-[1px] bg-white border-gray-500 pr-3 pl-1 rounded-md h-8 cursor-pointer">
                    <option value="">Price</option>
                    <option value="20">$0-$20</option>
                    <option value="50">$21-$50</option>
                    <option value="51">$51 &</option>
                </select>
                </div>
            </div>
          </div> 

            <div className="flex flex-row gap-10 lg:w-[20%] mt-5 lg:mt-0 w-[100%]">
                <span className="text-xl"><b>Sort By</b></span>
                <div className="gap-4 flex flex-row">
                    <button className="text-center pr-2 pl-2 md:pr-4 md:pl-4 bg-black text-white h-8 rounded-md" onClick={sortByLowPrice}>Low Price</button>
                    <button className="text-center pr-2 pl-2 md:pr-4 md:pl-4 bg-white text-black h-8 rounded-md" onClick={sortByHighPrice}>High Price</button>
                </div>
            </div> 
        </div>

        <div className="flex flex-row mt-8 gap-8 flex-wrap">
            { 
  
            filteredData?.map((item, i) => {
            return (<div key={i} className="bg-white w-[330px] rounded-3xl md:m-0 m-auto flex flex-col h-auto cursor-pointer" onClick={()=> {openItemModal(item.id)}}>
                    <div className="w-full h-56"><img className="w-full h-full rounded-t-3xl" src={item.img} alt="lamp" /></div>
                    <div className="p-6 flex flex-col gap-2">
                        <div className="h-[100px]">
                        <h4 className="text-2xl font-bold">{item.title}</h4>
                        <h6 className="text-xl font-semibold opacity-40">{item.desc}</h6>
                        </div>
                        <span className="text-2xl font-bold">{item.price}.00 USD</span>
                    </div>
                   </div>)})
                   }
        </div>
    </div>
    {modal &&  
    // <div className="modalOverlay">
            <div className="modal md:rounded-lg flex flex-col gap-5 h-[102%] w-full lg:w-[50%] lg:h-[75vh] m-0 md:m-auto">
                <div className="flex flex-row justify-between mt-2">
                    <h1 className="text-2xl font-bold">{item[0].title}</h1>
                    <button onClick={closeModal}>Back</button>
                </div>
                <div className="flex flex-col gap-6 lg:flex-row">
                    <img className="lg:h-[580px] lg:w-[450px] md:h-[580px]" src={item[0].img} alt="item-img" />
                    <div>
                        <div>
                            <h2 className="text-xl font-medium mb-3">Description</h2>
                            <p className="font-normal">{item[0].description}</p> <br />
                            <span className="block font-semibold text-lg text-gray-500">Length: {item[0].length} *</span>
                            <span className="block font-semibold text-lg text-gray-500">Width: {item[0].width} *</span>
                            <span className="block font-semibold text-lg text-gray-500">Height: {item[0].height} *</span>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-medium mb-3">Characteristics</h2> <br />
                            <span className="block font-semibold text-lg text-gray-400 mb-2">Condition: {item[0].condition.toUpperCase()}</span>
                            <span className="block font-semibold text-lg text-gray-400">Manufacturer: {item[0].manufacture.toUpperCase()}</span>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-medium mb-3">Payment and delivery</h2> <br />
                            <div className="border-t-[1px] p-1 pt-6 pb-6 flex flex-row justify-between align-middle">
                                <h1 className="text-2xl text-black font-bold">{item[0].price}.00 USD</h1>
                                <button className="border-none text-blue-800">Add to Cart</button>
                                <button className="p-8 pt-2 pb-2 rounded-2xl bg-blue-800 text-white" onClick={()=> buy(item[0].price)}>Buy</button>
                            </div>
                        </div>


                    </div>
                    <div>
       
                    </div>
                </div>
            </div>
       }       
    </>)
}

export default Body;