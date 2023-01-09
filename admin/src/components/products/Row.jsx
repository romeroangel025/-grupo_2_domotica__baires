import React from "react";

export const Row = ({id,title,discount,price,getInfo}) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>{discount}</td>
      <td className="text-right">{price}</td>
 

      <td>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-sm btn-primary mx-1"
            style={{ width: "30px" }} title="Info"
            onClick={()=> console.log( getInfo(id))} 
          >
            <i className="fas fa-info">i</i>
          </button>
</div>
</td>
    </tr>
  );
};