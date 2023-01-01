import React, { useState } from "react";

function SmallInput({value}) {
  const [procedureName, setProcedureName] = useState();
  const [price, setPrice] = useState();

  function handleNameChange(event) {
    console.log("name: "+event.target.value);
  }
  function handlePriceChange(event) {
    console.log("price: "+event.target.value);
  }

  return (
    <div className="flex justify-between pt-6 px-24">
    <input
      type="text"
      name="procedureName"
      placeholder="ชื่อหัตการ"
      value={procedureName}
      onChange={handleNameChange}
      className="w-3/6 text-xl inputUnderline"
    />
     <input
      type="text"
      name="price"
      placeholder="ราคา"
      value={price}
      onChange={handlePriceChange}
      className="w-2/6 text-xl inputUnderline"
    />
    <p className="pt-8">บาท</p>
  </div>
  )
}

export default SmallInput;