import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Swal from 'sweetalert2'
import TableSkeleton from '../components/TableSkeleton'
const Detail = () => {
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const endpointURL =process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PRO_MODE;
    const handelFetchDetail = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(endpointURL+'/api/v1/bet-details',{
              headers: { 
                  'Content-Type': 'application/json'
                }
            });
            const result = await response.json(); 
            if(result.status === true)
            {
               setData(result.data);
               setIsLoading(false);
            }
          }catch (error) {
            console.error('fetch data error:', error);
            setIsLoading(false);
        }
    }
    const handleDelete = async (token) => {
        //console.log(localStorage.getItem('token'));
        Swal.fire({
            text: 'Are you sure want to delete!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
          }).then( async (result) => {
            if (result.isConfirmed) {
                try{
                    const tokenArray = {
                        "token": token
                      };
                    const response = await fetch(endpointURL+"/api/v1/delete-token",{
                        method:"POST",
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization':  'Bearer '+localStorage.getItem('token'),
                        },
                        body: JSON.stringify(tokenArray),
                    });
                    const result = await response.json();
                    if(response.status === 200)
                    {
                        const filterData = data.filter((row) => row.token !== token);
                        setData(filterData);
                        Swal.fire({
                            text: result.msg,
                            width: 500,
                            timer:1000
                        }); 
                    }else
                    {
                    }
                }catch(error){
        
                }
            }
          });
        
    }
    useEffect(() =>{
        handelFetchDetail();
    },[]);
  return (
    <>
        <Header />
        <div className="grid gap-6 mb-2">
            <div className="relative overflow-y-auto  shadow-md sm:rounded-lg pl-6 pr-6">
                <table className="w-4/5 table-auto text-center mx-auto text-sm table-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                            <th scope="col" className="px-2 py-2">
                                Created_at
                            </th>
                            <th scope="col" className="px-2 py-2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        isLoading ?  (
                            <tr>
                                <td colSpan={7}>
                                    <TableSkeleton />
                                </td>
                            </tr>
                        ):
                        data.map((row, index) => (
                        <tr key={index}  className="bg-dark hover:bg-gray-700 border-b dark:bg-gray-800 dark:border-gray-900">
                            <td className="px-2 py-2">
                                {row.date}
                            </td>  
                            <td className="px-2 py-2">
                                3:30
                            </td>  
                            <td className="px-2 py-2">
                                {row.merged_number}
                            </td> 
                            <td className="px-2 py-2">
                                {row.amount }
                            </td> 
                            <td className="px-2 py-2" style={{textAlign:"right",paddingRight:"30px"}}>
                                {row.total_row * row.amount}
                            </td>  
                            <td className="px-2 py-2">
                                {row.created } 
                            </td>      
                            <td>
                                <svg onClick={(e) => handleDelete(row.token)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer text-red-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </td>
                        </tr>
                    ))} 
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Detail