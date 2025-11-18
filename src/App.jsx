import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './App.css'

function App() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    load_data();
  }, []);

  //load data

  let load_data = async () => {
    let resp = await fetch("https://deepak-rest-api.vercel.app/user");
    let res = await resp.json();
    setUserData(res);
  }

  //delete user 

  let delete_user = async (id) => {
    let resp = await fetch("https://deepak-rest-api.vercel.app/user/" + id, {
      method: "delete",
      headers: { "Content-type": "application/json" }
    });

    let res = await resp.json();

    if (res.data.acknowledged == true) {
      load_data();
    }

  }

  return (
    <div className='container py-4'>
      {userData == null ?

        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <div className="loader">
            <div data-glitch="Loading..." className="glitch">Loading...</div>
          </div>
        </div>

        :
        <div>
          <div className='d-flex justify-content-between mb-1'>
            <h6>Total User</h6>
            <Link to={"/add_new_user"} className="btn btn-sm btn-success">Add New User</Link>
          </div>
          <table className='table table-bordered table-striped text-center'>
            <thead className='bg-dark text-light'>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {userData.map((user) =>
                <tr>
                  <td>{user._id}</td>
                  <td>{user.fname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.salary}</td>
                  <td><Link to={"/edit_user/"+user._id} className="btn btn-sm btn-primary">Edit</Link></td>
                  <td><Link onClick={() => delete_user(user._id)} className="btn btn-sm btn-danger">Delete</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default App