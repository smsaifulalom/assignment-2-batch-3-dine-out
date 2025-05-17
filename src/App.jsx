import CreateOrder from "./components/CreateOrder";
import Header from "./components/Header";
import OrderReports from "./components/OrderReports";
import OrderSummary from "./components/OrderSummary";
import { useState } from "react";

export default function App() {
  const [orders, setOrders] = useState([]);
  function handAddOrder(order) {
    setOrders((prev) => [order, ...prev]);
  }

  function handleDeliverStatus(orderId) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "DELIVERED" } : order
      )
    );
  }

  function handleDeleteOrder(orderId) {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  }
  return (
    <>
      {/* Navbar area */}
      <div className="container mx-auto px-4 h-screen flex flex-col">
        <Header />

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
          <CreateOrder onAddOrder={handAddOrder} />

          {/* Order Summary */}
          <div className="md:col-span-2 h-[calc(100vh_-_130px)]">
            <OrderSummary orders={orders} />

            {/* Order Reports */}
            <OrderReports
              orders={orders}
              onDeliveryStatus={handleDeliverStatus}
              onDelete={handleDeleteOrder}
            />
          </div>
        </div>
      </div>
    </>
  );
}
