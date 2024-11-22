import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [orderss, changeOrders] = useState(false);
  const {user} = useSelector((state)=> state.auth);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FETCH_LINK}/my-orders`, {
      withCredentials: true
    }).then((response) => {
      changeOrders(response.data)
    })
  }, [])
  console.log(orderss)
  // const [profile, setProfile] = ;

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setProfile({ ...profile, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          {/* <button
            onClick={toggleEdit}
            className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isEditing ? "Save" : "Edit"}
          </button> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={user.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-3 rounded-lg border ${isEditing
                  ? "border-blue-500 focus:ring-blue-500"
                  : "bg-gray-100 border-gray-300"
                }`}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-3 rounded-lg border ${isEditing
                  ? "border-blue-500 focus:ring-blue-500"
                  : "bg-gray-100 border-gray-300"
                }`}
            />
          </div>
          {/* <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-3 rounded-lg border ${isEditing
                  ? "border-blue-500 focus:ring-blue-500"
                  : "bg-gray-100 border-gray-300"
                }`}
            />
          </div> */}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
        {orderss.length > 0 &&
          <>
          
            {orderss.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </>}
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => {
  const calculateTotal = () =>
    order.items.reduce((total, item) => total + item.quantity * item.product.price, 0);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Order #{order.id}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Delivered"
              ? "bg-green-500 text-white"
              : order.status === "In Progress"
                ? "bg-yellow-500 text-white"
                : "bg-red-500 text-white"
            }`}
        >
          {order.status}
        </span>
      </div>
      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-2"
          >
            <div className="flex items-center">
              <img
                src={item.product.imageUrl}
                alt={item.product.productName}
                className="w-16 h-16 rounded-lg mr-4 object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {item.productName}
                </h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-gray-700">
                ${(item.quantity * item.product.price).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                (${item.product.price.toFixed(2)} each)
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-semibold text-gray-800">Total:</p>
        <p className="text-xl font-bold text-gray-900">${calculateTotal().toFixed(2)}</p>
      </div>
    </div>
  );
};


export default ProfilePage;


