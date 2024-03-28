import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RemoveTask, getTaskData, statuschange } from "../redux/action"; // Update the import to use removeTask action
import { useHistory, useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import axios from "axios";
import { EDITING, EDITINGSTATUS } from "../redux/actiontype";

function TaskCard({ title, description, taskdate, _id, status, createdDate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(_id);
  const toast = useToast();
  const taskdata = useSelector((state) => state.user.Taskdata);

  async function deleteTask(_id) {
    
    dispatch(RemoveTask(_id)).then(() => {
      dispatch(getTaskData());
    });
    toast({
      title: "Task Deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  async function editTask(_id) {
    dispatch({
      type: EDITING,
      payload: { id: _id },
    });
  }

  function HandleStatus(_id) {
    const formdata = taskdata.filter((el) => el._id === _id);

    if (formdata.length === 0) {
        console.error("Task not found with ID:", _id);
        return; // Exit function if task not found
    }

    const statusobj = {
      ...formdata[0],
      status: !formdata[0].status
    };

    dispatch(statuschange(_id, statusobj)).then(() => {
      dispatch(getTaskData());
    });
  }

  return (
    <div className="w-[400px]">
      <Card className="text-left ">
        <CardHeader className="flex justify-between items-center">
          <Heading size="md">Task Report</Heading>
          <Box className="flex justify-center items-center">
            {/* <Text
              onClick={() => {
                HandleStatus(_id);
              }}
              className={`mx-2 p-2 ${status ? "bg-red" : "bg-blue"}`}
            >
              {status ? "Completed" : "Not Completed"}
            </Text> */}
            <Button className="mr-2"  onClick={() => {
                HandleStatus(_id);
              }}> {status ? "Completed" : "Not Completed"}</Button>
            <MdEditSquare
              onClick={() => {
                editTask(_id);
              }}
            />
            <MdDelete
              onClick={() => {
                deleteTask(_id);
              }}
            />
          </Box>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Task
              </Heading>
              <Text pt="2" fontSize="sm">
                {title}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Task Deadline 
              </Heading>
              <Text pt="2" fontSize="sm">
                {taskdate}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Description
              </Heading>
              <Text pt="2" fontSize="sm">
                {description}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default TaskCard;
