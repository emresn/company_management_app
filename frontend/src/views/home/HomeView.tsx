import React from "react";

type Props = {
  title :string
};

const HomeView = ({title}: Props) => {
  return (
    <div className="flex flex-col ">
      <div id="title" className="bg-gray-300 px-4">
        <div className="flex flex-row justify-between items-center">
          <h4 className="">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
