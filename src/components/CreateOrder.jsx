import Hamburger from "/src/assets/hamburger.svg";
import ChickenNuggets from "/src/assets/chicken.svg";
import Submarine from "/src/assets/submarine.svg";
import Pizza from "/src/assets/pizza.svg";
import { useState } from "react";

export default function CreateOrder({ onAddOrder }) {
  const [total, setTotal] = useState(0);
  const [addMinus, setAddMinus] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState("");

  const menuItems = {
    Hamburger: 300,
    "Chicken Nuggets": 300,
    "Submarine Sandwich": 300,
    "Pizza slices": 300,
  };

  function handleToggle(itemName, price) {
    setAddMinus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
    setTotal((prevTotal) =>
      addMinus[itemName] ? prevTotal - price : prevTotal + price
    );
  }

  function handleTotalOrder() {
    if (!customerName.trim()) {
      setError("Please enter a customer name");
      return;
    }
    const selectedItems = Object.keys(addMinus).filter(
      (item) => addMinus[item]
    );
    if (selectedItems.length === 0) {
      setError("Please select at least one item");
      return;
    }
    setError("");
    const order = {
      id: Math.floor(Math.random() * 90) + 10,
      name: customerName,
      items: selectedItems.length,
      amount: total,
      status: "PENDING",
    };
    onAddOrder(order);

    setTotal(0);
    setAddMinus({});
    setCustomerName("");
  }

  return (
    <div className="bg-cardbg rounded-lg p-6 h-[calc(100vh_-_130px)]">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of
        their requirements.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Customer Name</label>
        <input
          required
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          type="text"
          className="w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          aria-invalid={error.includes("name") ? "true" : "false"}
        />
        {error.includes("name") && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Choose Items</label>
        <div className="items-container">
          {Object.entries(menuItems).map(([itemName, price]) => (
            <div
              key={itemName}
              className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="w-12 h-12   flex items-center justify-center mr-3">
                  <img
                    src={
                      itemName === "Hamburger"
                        ? Hamburger
                        : itemName === "Chicken Nuggets"
                        ? ChickenNuggets
                        : itemName === "Submarine Sandwich"
                        ? Submarine
                        : Pizza
                    }
                    alt={itemName}
                    className="w-10 h-10"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{itemName}</h3>
                  <p className="text-xs text-gray-400">BDT {price}</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle(itemName, price)}
                className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                {addMinus[itemName] ? <PlusSvg /> : <MinusSvg />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleTotalOrder(total)}
        className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
      >
        {`Place Order (BDT ${total})`}
      </button>
    </div>
  );
}

function MinusSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-green-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PlusSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-red-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
