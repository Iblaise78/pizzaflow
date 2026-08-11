import React from 'react';

const statuses = ['Order Received', 'In Kitchen', 'Sent to Delivery', 'Delivered', 'Cancelled', 'Pending', 'Preparing', 'Baking', 'Out for Delivery'];

export function OrderTable({ orders, onChangeStatus }) {
  return (
    <div className="table-card">
      <table className="data-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id || order.id}>
              <td>{order.id || order._id}</td>
              <td>{order.userName || order.customer?.fullName || 'Customer'}</td>
              <td>
                <span className={`status-pill stage-${(order.orderStatus || order.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                  {order.orderStatus || order.status}
                </span>
              </td>
              <td>${Number(order.total || 0).toFixed(2)}</td>
              <td>
                <select
                  className="table-select"
                  value={order.orderStatus || order.status}
                  onChange={(event) => onChangeStatus(order._id || order.id, event.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
