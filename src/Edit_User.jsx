import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

function Edit_User() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [fname, setFname] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [salary, setSalary] = useState("");
    const [user, setUser] = useState(null);

    // LOAD USER DATA
    const load_data = async () => {

        let resp = await fetch(`https://deepak-rest-api.vercel.app/user/${id}`);
        let res = await resp.json();

        setUser(res);
        setFname(res.fname);
        setCity(res.city);
        setEmail(res.email);
        setPhone(res.phone);
        setSalary(res.salary);
    };

    useEffect(() => {
        load_data();
    }, [id]);

    // UPDATE USER
    const update_user = async () => {
        let resp = await fetch(`https://deepak-rest-api.vercel.app/user/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                fname,
                city,
                email,
                phone,
                salary
            })
        });

        let res = await resp.json();

        await load_data();

        navigate("/");  // redirect to data page
    };

    return (
        <>
            {user ? (
                <div style={{ width: "600px", margin: "auto" }}>
                    <br /><br />
                    <input onChange={(e) => setFname(e.target.value)} className='form-control' type="text" value={fname} /><br />
                    <input onChange={(e) => setCity(e.target.value)} className='form-control' type="text" value={city} /><br />
                    <input onChange={(e) => setEmail(e.target.value)} className='form-control' type="email" value={email} /><br />
                    <input onChange={(e) => setPhone(e.target.value)} className='form-control' type="text" value={phone} /><br />
                    <input onChange={(e) => setSalary(e.target.value)} className='form-control' type="text" value={salary} /><br />

                    <button className='btn btn-success' onClick={update_user}>Update</button>
                </div>
            ) : (
                <h2>Fetching.....</h2>
            )}
        </>
    );
}

export default Edit_User;
