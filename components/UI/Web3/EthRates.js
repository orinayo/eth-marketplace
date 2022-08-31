export default function EthRates({ eth, ethPerItem }) {
  return (
    <div className="grid grid-cols-4 mb-5">
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div>
            <span className="text-2xl font-bold">ETH = {eth}$</span>
          </div>
          <p className="text-xl text-gray-500">Current ETH Price</p>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div>
            <span className="text-2xl font-bold">{ethPerItem} = 15$</span>
          </div>
          <p className="text-xl text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
}
