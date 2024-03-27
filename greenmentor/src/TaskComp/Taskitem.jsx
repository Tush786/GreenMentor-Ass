import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskData } from "../redux/action";
import Taskcard from "./Taskcard";

function Taskitem() {
  const dispatch = useDispatch();
  const TaskData = useSelector((state) => state.user.Taskdata);
  console.log(TaskData);

  useEffect(() => {
    dispatch(getTaskData());
  }, []);
  return (
    <div className="grid grid-cols-2 gap-4">
      {TaskData?.map((el, ind) => {
        return <Taskcard key={ind} {...el} />;
      })}
    </div>
  );
}

export default Taskitem;
