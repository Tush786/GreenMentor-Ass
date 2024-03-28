import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskData } from "../redux/action";
import Taskcard from "./Taskcard";
import Pagination from "./Pagination";
import { Button } from "@chakra-ui/react";

function Taskitem() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const TaskData = useSelector((state) => state.user.Taskdata);
  console.log(TaskData);

  function handlePrev() {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNext() {
    setPage((prevPage) => Math.min(prevPage + 1, 5)); // Assuming maximum page is 5
  }

  useEffect(() => {
    dispatch(getTaskData(page, limit));
  }, [page, limit]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {TaskData?.map((el, ind) => {
          return <Taskcard key={ind} {...el} />;
        })}
      </div>

      <div>
        <Button disabled={page === 1} onClick={handlePrev}>
          Prev
        </Button>
        <Button>{page}</Button>
        <Button disabled={ TaskData.length<4} onClick={handleNext}>
          Next
        </Button>
      </div>
    </>
  );
}

export default Taskitem;
