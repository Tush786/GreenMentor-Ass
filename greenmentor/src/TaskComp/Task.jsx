import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Addtask, editTask, getTaskData } from "../redux/action";

function Task() {
  const [taskform, setTaskform] = useState({
    title: "",
    taskdate: "",
    description: "",
  });

  const toast = useToast();
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedValue =
      name === "taskdate" ? new Date(value).toISOString().split("T")[0] : value;
    setTaskform((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
    console.log(taskform);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { title, taskdate, description } = taskform;
    if (!title) {
      toast({
        title: "All field are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!taskdate) {
      toast({
        title: "All field are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!description) {
      toast({
        title: "All field are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log(taskform);
    if(Editing){
      dispatch(editTask(Editid,taskform)).then(() => {
        dispatch(getTaskData());
      });
    }
    else{
      dispatch(Addtask(taskform)).then(() => {
        dispatch(getTaskData());
      });
    }
    

    setTaskform({
      title: "",
      taskdate: "",
      description: "",
    });
  }


  const Editing=useSelector(state=>state.user.editing)
  const Editid=useSelector(state=>state.user.editformid)
  const taskdata=useSelector(state=>state.user.Taskdata)

  useEffect(()=>{
      if(Editing){
        const formdata=taskdata.filter(el=>el._id==Editid)
        setTaskform(formdata[0])
      }
  },[Editing,Editid])

  return (
    <div className="w-[500px] border-dashed">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            onChange={handleChange}
            name="title"
            placeholder="Enter title"
            value={taskform.title}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Deadline of task</FormLabel>
          <Input
            onChange={handleChange}
            name="taskdate"
            type="date"
            placeholder="Enter date"
            value={taskform.taskdate}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            onChange={handleChange}
            name="description"
            placeholder="Enter description about task"
            value={taskform.description}
          />
        </FormControl>

        <Input mt={4} colorScheme="teal" type="submit" />
      </form>
    </div>
  );
}

export default Task;
