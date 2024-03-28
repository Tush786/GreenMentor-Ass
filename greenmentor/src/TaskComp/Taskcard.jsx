import {
  Box,
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
import { useDispatch } from "react-redux";
import { RemoveTask, getTaskData } from "../redux/action"; // Update the import to use removeTask action
import { useHistory, useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import axios from "axios";
import { EDITING, EDITINGSTATUS } from "../redux/actiontype";

function TaskCard({ title, description, taskdate, _id,status,createdDate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(_id);
  const toast=useToast()

  async function deleteTask(_id) {
    dispatch(RemoveTask(_id)); // Wait for the RemoveTask action to complete
    dispatch(getTaskData());
     // Dispatch getTaskData after deleting the task
     toast({
      title: "Task Deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  async function editTask(_id) {
    dispatch({
      type:EDITING,
      payload:{id:_id}
    })
  }


  function HandleStatus(_id){
  
  }

  return (
    <div className="w-[400px]">
      <Card className="text-left ">
        <CardHeader className="flex justify-between items-center">
          <Heading size="md">Client Report</Heading>
          <Box className="flex justify-center items-center">
          <Text   onClick={() => {
                HandleStatus(_id);
              }} className={`mx-2 p-2 ${status ? 'bg-red' : 'bg-blue'}`}>
  {status ? "Completed" : "Not Completed"}
</Text>
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
                Task Scheduled Date
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
