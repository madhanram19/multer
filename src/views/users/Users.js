// import React from 'react';
// import { useGetUsersQuery } from '../../redux/services/adminAPI';
// import { useNavigate } from 'react-router-dom';

// const Users = () => {
//   const { data, isFetching } = useGetUsersQuery();
//   const users = data?.data;

//   const navigate = useNavigate();

//   if (isFetching) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="user-table-container">
//       <h2>Users</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">S.No</th>
//             <th scope="col">ID</th>
//             <th scope="col">Username</th>
//             <th scope="col">Email</th>
//             <th scope="col">Kyc Status</th>
//             <th scope="col">Views</th>
//           </tr>
//         </thead>
//         <tbody >
//           {users.map((user, index) => (
//             <tr key={user._id} >
//               <td className="serial-no p-3">{index + 1}</td>
//               <td className='p-3'>{user._id}</td>
//               <td className='p-3'>{user.username}</td>
//               <td className='p-3'>{user.email}</td>
//               <td className='p-3'>{users[index].kycstatus.toString()}</td>
//               <td ><button className='btn btn-primary' onClick={()=>navigate(`/kycdetail/${user._id}`)}>Kyc Details</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;

import React from 'react';
import DataTable from 'react-data-table-component';
import { useGetUsersQuery } from '../../redux/services/adminAPI';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const { data, isFetching } = useGetUsersQuery();
  const navigate= useNavigate();
  const users = data?.data;


  
  const columns = [
    { name: 'S.No', selector: (row, index) => index + 1, sortable: true },
    { name: 'ID', selector: (row) => row._id},
    { name: 'Username', selector: 'username', sortable: true },
    { name: 'Email', selector: 'email', sortable: true },
    {
      name: 'Kyc Status',
      selector: (row) => row.kycstatus.toString(),
      sortable: true,
    },
    {
      name: 'Views',
      cell: (row) => <button className='btn btn-primary' onClick={()=>navigate(`/UserList/${row._id}`)}>kycdetail</button>
    },
  ];

  const dataForTable = users || [];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f5f5f5',
      },
    },
    rows: {
      style: {
        minHeight: '56px', // override the row height
      },
    },
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-table-container">
      <h2>Users</h2>
      <DataTable
        columns={columns}
        data={dataForTable}
        pagination
        customStyles={customStyles}
      />
    </div>
  );
};

export default Users;



