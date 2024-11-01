import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Car Brands Management</h2>
        <ul>
          <li>Toyota</li>
          <li>Honda</li>
          <li>Ford</li>
          <li>Chevrolet</li>
          <li>Nissan</li>
        </ul>
      </div>
      <div>
        <h2>Statistics</h2>
        <p>Total Cars: 100</p>
        <p>Active Users: 50</p>
      </div>
      <div>
        <h2>Actions</h2>
        <button>Add New Car Brand</button>
        <button>View All Cars</button>
        <button>Manage Users</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
