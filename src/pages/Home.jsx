import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header' 
import Swal from 'sweetalert2'
import ThreeSkeleton from '../components/ThreeSkeleton'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const [submitted,setSubmitted] = useState(false);
  const [saveLoading,isSaveLoading] = useState(false);
  const [updateLoading,setUpdateLoading] =useState(false);
  const [loading,isLoading] = useState(false);
  const [start,setStart] = useState(0);
  const [end,setEnd]   = useState(99);
  const [rows,setRows] = useState([]);
  const [data,setData] = useState([]);
  const [activeElement, setActiveElement] = useState(null);
  const [defaultnumbers,setDefaultNumbers] = useState([]);
  const [total,setTotal] = useState(0);
  const [updateKey,setUpdateKey] = useState(null);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const saveAudioRef = useRef(null);
  const inputRef = useRef(null);
  const [brake,setBrake] = useState(localStorage.getItem("brake") == null? 10000:localStorage.getItem("brake"));
  const endpointURL =process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PRO_MODE;
  const [values,setValues] = useState({
        date : "16-11-2024",
        number:"",
        amount:"",
        numberArray:[]
    });
    const handleKeyDown = (event) => {
        //event.preventDefault();
        if (event.key === 'Enter' && values.number.length >=3 && values.amount >=100) {
            inputRef.current.focus();
            setRows(prevItems => [...prevItems, values]); 
            setValues({
                date : "16-11-2024",
                number:"",
                amount:"",
                numberArray:[] 
            });
            audioRef.current.play();
            console.log('Enter key was pressed!');
        }else if(event.key === 'F4')
        {
            console.log("Press f4 to save" );
            handleSave();   
        }else if(event.key === 'F6')
        {
            console.log("Press f6 to save" );
            handleUpdate();   
        }
    };

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        if (/^\d*\.?\d*$/.test(value)) {
            setValues(values => ({
                ...values,
                [key]: value,
            }))
        }
    }
    const handleBrake = (e) => {
        setBrake(e.target.value);
        localStorage.setItem("brake",e.target.value);
    }
    function handleChangeBlur(e) {
        const value = e.target.value
        if(value.length >= 3)
        {
            let numArr = value.match(/.{1,3}/g).filter(num => num.length !== 2 && num.length !==1 );
            setValues(values => ({
                ...values,
                numberArray: numArr,
            }));
        }
    }
    function handleChangeText(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }
    const  handleSave = async (e) =>{
        isSaveLoading(true);
        const betArray = {
            "bets": rows
          };
        if(rows.length > 0)
        {
            if(!submitted){      
                setSubmitted(true);
                try{
                const response = await fetch(endpointURL+"/api/v1/insert",{
                    method:"POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization':  'Bearer '+localStorage.getItem('token'),
                    },
                    body: JSON.stringify(betArray),
                });
                const result = await response.json();
                if(response.status === 200)
                {
                    saveAudioRef.current.play();
                    handelFetch();
                    Swal.fire({
                        text: result.msg,
                        width: 500,
                        timer:1000
                    }); 
                    setRows([]);
                    isSaveLoading(false);
                    setSubmitted(false);
                }else
                {
                    setSubmitted(false);
                }
                }catch(error){
                    setSubmitted(false);
                }
            }
        }else
        {
            // Swal.fire({
            //     text: "There is no data...",
            //     width: 500
            // }); 
            isSaveLoading(false);
        }
    }
    const handelFetch = async (e) => {
        isLoading(true);
        try {
            const response = await fetch(endpointURL+'/api/v1/three-numbers',{
              headers: { 
                  'Content-Type': 'application/json'
                }
            });
            const result = await response.json(); 
            if(result.status === true)
            {
              setData(result.data);                         
               const filterSelection = result.data.filter(item => item.number >= start && item.number <= end);
                setDefaultNumbers(filterSelection);
                setTotal(result.total);
                isLoading(false);
            }
          }catch (error) {
            console.error('fetch data error:', error);
        }
    }
    const filterNumbers = (start,end,element) => {
        const filterSelection = data.filter(item => item.number >= start && item.number <= end);
        setStart(start);
        setEnd(end);
        setDefaultNumbers(filterSelection);
        setActiveElement(element);
    }
    const getColor = (element) => {
        return activeElement === element ? 'green' : 'gray';
    };
    const handleTableRow = (index) =>{
        console.log("hello" +rows[index].numberArray);
        setUpdateKey(index);
        setValues({
            date : "16-11-2024",
            number: rows[index].number,
            amount: rows[index].amount,
            numberArray: rows[index].numberArray
        });
    }
    const handleUpdate = () => {
        if(updateKey !== null)
        {
            setUpdateLoading(true);
            setUpdateKey(null);
            const updatedItems = rows.map((item, idx) => {
                return idx === updateKey ? values : item; // Update only the item at the index
            });
            setRows(updatedItems);
            inputRef.current.focus();
            setValues({
                    date : "16-11-2024",
                    number:"",
                    amount:"",
                    numberArray:[] 
            });
            audioRef.current.play();
            setUpdateLoading(false);
        }   
    }
    const sumAmounts = () => {
        const total = rows.reduce((acc, row) => acc +  parseInt(row.amount), 0);
        return total;
      };
    const sumAmountsLimit = () => {
      const limits =    data.filter((num) => num.amount > brake);
      const limitTotal = limits.reduce((acc,row) => acc + parseInt(row.amount) - brake,0);
      return limitTotal;
    }
    useEffect(() => {
        // if(localStorage.getItem('token') == null || localStorage.getItem('token')=="")
        // {
        //     navigate("/");
        // }
        // console.log("afa"+localStorage.getItem('token'));
        handelFetch();
        window.addEventListener('keydown', handleKeyDown);
        // Cleanup event listener on component unmount
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
       
    },[]);
  return (
    <>
       <Header />
       <div className="grid  gap-2 xl:grid-cols-7 px-3">
        <div className='col-span-2'>
          <div className="grid gap-6 mb-2 md:grid-cols-2">
            <div>
                <label for="brake" className="block mb-2 text-sm font-medium  dark:text-white">ဘရိတ်</label>
                <input type="text" id="brake" value={brake} onChange={handleBrake} onKeyDown={handleKeyDown}  className="bg-black border  border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark"  required />
            </div>
            <div>
                <label for="date" className="block mb-2 text-sm font-medium  dark:text-white">ထီထွက်ရက်စွဲ</label>
                <select  id="date" onChange={handleChangeText} className="bg-black border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="16-11-2024">16-11-2024</option>
                </select>
            </div>
          </div>
          <div className="grid gap-6 mb-2 md:grid-cols-2">
            <div>
                <label for="number" className="block mb-2 text-sm font-medium  dark:text-white">ဂဏန်း</label>
                <input type="text" ref={inputRef} onKeyDown={handleKeyDown}   id="number" onBlur={handleChangeBlur} autoComplete='off' value={values.number} onChange={handleChange} className="bg-black border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark"  required />
            </div>
            <div>
                <label for="amount" className="block mb-2  text-sm font-medium  dark:text-white">ထိုးကြေး</label>
                <input type="text" id="amount" onKeyDown={handleKeyDown}  onChange={handleChange}   value={values.amount} autoComplete='off'  className="bg-black border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
          </div>
          <div className="grid gap-2 mb-2 md:grid-cols-3">
                <div>
                    <label for="update" className="block  text-sm font-medium  dark:text-white">&nbsp;</label>
                    <button  id="update" onClick={ handleUpdate} className="flex w-full justify-center rounded-md bg-green-500 px-3 py-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                       {updateLoading? "Updating...":"Update (F6)"}
                    </button>
                </div>
                <div>
                    <label for="save" className="block  text-sm font-medium  dark:text-white">&nbsp;</label>
                    <button id="save" onClick={handleSave} className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      {saveLoading?"Saving...":"Save (F4)"}
                    </button>
                </div>
                <div>
                    <label className="block  text-sm font-medium  dark:text-white">&nbsp;</label>
                    <button  className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                       {total}
                    </button>
                </div>
          </div>
        
        </div>
        <div className='col-span-4'>
          <div className="relative overflow-y-auto max-h-64 shadow-md sm:rounded-lg">
              <table className="w-full text-sm table-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-2 py-2">
                              Date
                          </th>
                          <th scope="col" className="px-2 py-2">
                              Time
                          </th>
                          <th scope="col" className="px-2 py-2">
                              Number
                          </th>
                          <th scope="col" className="px-2 py-2">
                              Amount
                          </th>
                          <th scope="col" className="px-2 py-2">
                              Total
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                   {rows.map((row, index) => (
                    <tr key={index} onClick={(e)=>handleTableRow(index)} className="bg-dark border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-2 py-2">
                            {row.date}
                        </td>  
                        <td className="px-2 py-2">
                            3:30
                        </td>  
                        <td className="px-2 py-2">
                            {row.number}
                        </td> 
                        <td className="px-2 py-2">
                            {row.amount}
                        </td> 
                        <td className="px-2 py-2" style={{textAlign:"right",paddingRight:"30px"}}>
                            {row.number.match(/.{1,3}/g).filter(num => num.length !== 2 && num.length !==1 ).length * row.amount }
                        </td>       
                    </tr>
                  ))} 
                  <tr>
                    <td colSpan={4}></td>
                    <td colSpan={1} className='text-green-600' style={{textAlign:"right",paddingRight:"30px"}}>{sumAmounts()}</td>
                  </tr>
                  </tbody>
              </table>
          </div>
        </div>
        <div className='col-span-1 overflow-y-auto max-h-64'>
            <table className="w-full text-sm table-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col">
                              Number
                          </th>
                          <th scope="col">
                              Amount
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                        data.filter((num) => num.amount > brake).map(num => (
                            <tr className="bg-dark  dark:bg-gray-800 dark:border-gray-700">
                                <td  className="font-medium  whitespace-nowrap">
                                    {num.number}
                                </td>
                                <td>
                                    { num.amount - brake}
                                </td>
                            </tr>
                        ))
                    }
                  </tbody>
              </table>
        </div>
      </div>
      
      <div>
        <div className="grid grid-cols-12 text-center border-b-2">
            <div className='col-span-6 grid grid-cols-10'>
                <div onClick={(e) => filterNumbers(0,99,'element1')} style={{cursor:"pointer",color: getColor('element1')}}>
                    000-099
                </div>
                <div  onClick={(e) => filterNumbers(100,199,'element2')} style={{cursor:"pointer",color: getColor('element2')}} >
                    100-199
                </div>
                <div  onClick={(e) => filterNumbers(200,299,'element3')} style={{cursor:"pointer",color: getColor('element3')}}>
                    200-299
                </div>
                <div  onClick={(e) => filterNumbers(300,399,'element4')} style={{cursor:"pointer",color: getColor('element4')}}>
                    300-399
                </div>
                <div  onClick={(e) => filterNumbers(400,499,'element5')} style={{cursor:"pointer",color: getColor('element5')}}>
                    400-499
                </div>
                <div  onClick={(e) => filterNumbers(500,599,'element6')} style={{cursor:"pointer",color: getColor('element6')}}>
                    500-599
                </div>
                <div  onClick={(e) => filterNumbers(600,699,'element7')} style={{cursor:"pointer",color: getColor('element7')}}>
                    600-699
                </div>
                <div  onClick={(e) => filterNumbers(700,799,'element8')} style={{cursor:"pointer",color: getColor('element8')}}>
                    700-799
                </div>
                <div  onClick={(e) => filterNumbers(800,899,'element9')} style={{cursor:"pointer",color: getColor('element9')}}>
                    800-899
                </div>
                <div  onClick={(e) => filterNumbers(900,999,'element10')} style={{cursor:"pointer",color: getColor('element10')}}>
                    900-999
                </div>
            </div>
            <div className='col-span-6'>
                <span className='text-gray-400'>စုစုပေါင်း ကျွံအကွက်</span> 
                <span className='text-red-600 font-bold'>{data.filter((num) => num.amount > brake).length}</span> 
                <span className='text-gray-400'>စုစုပေါင်း </span> 
                <span className='text-red-600 font-bold'>{sumAmountsLimit()}</span> 
            </div>
        </div>  
      </div>
      <div className="grid  gap-2 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 py-2 px-3">
        {
          loading ?  (
            <ThreeSkeleton />
          ):
         defaultnumbers.map((num, index) => (
            <div key={index} className='col-span-1 text-center grid lg:grid-cols-2'>
                <div className={`col-span-1 text-lg text-gray-400 ${num.amount > brake ? 'bg-red-500':'bg-gray-700'}  rounded`}>{num.number}</div>
                <div className='col-span-1 text-green-500'>{num.amount}</div>
            </div>
            ))
        }
      </div>
      <audio ref={audioRef} src="/enter_player.mp3">
        Your browser does not support the audio element.
      </audio>
      <audio ref={saveAudioRef} src="/save.mp3">
        Your browser does not support the audio element.
      </audio>
    </>
  )
}

export default Home