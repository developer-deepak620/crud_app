import React, { useEffect, useState } from 'react'

function add_new_user() {

    let [fname, setFname] = useState("");
    let [lname, setLname] = useState("");
    let [city, setCity] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [salary, setSalary] = useState("");
    let [msg ,setMsg]=useState("");
    let [newId,setNewId]=useState("");

   
    let insert_new_customer = async () => {
        let resp = await fetch("https://deepak-rest-api.vercel.app/user", {

            method: "post",

            body: JSON.stringify({
                fname: fname,
                lname: lname,
                city: city,
                email: email,
                phone: phone,
                salary: salary
            }),

            headers: { "Content-type": "application/json" }

        });


        let res = await resp.json();

        if(res?.msg){
            setMsg(res.msg)
            setNewId(res.data.insertedId);
        }

    }

    return (
        <>
            <div className='container'>
                <h3 className='text-center'>Add New User</h3><br/>
                <input className='form-control' required type="text" onChange={(e) => setFname(e.target.value)} value={fname} placeholder='Enter first name' /><br />
                <input className='form-control' required type="text" onChange={(e) => setLname(e.target.value)} value={lname} placeholder='Enter last name' /><br />
                <input className='form-control' required type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder='Enter city' /><br />
                <input className='form-control' required type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter email' /><br />
                <input className='form-control' required type="text" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder='Enter phone number' /><br />
                <input className='form-control' required type="text" onChange={(e) => setSalary(e.target.value)} value={salary} placeholder='Enter salary' /><br />
                <button className='btn btn-success' onClick={insert_new_customer}>Submit</button>
                <br /><br />
                {msg != "" ? <> <p className='alert alert-success text-center'>{msg}<br /><br /> New Id: <b>{newId}</b></p></> : null}
            </div>
        </>
    )
}

export default add_new_user
