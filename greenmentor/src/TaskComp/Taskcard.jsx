import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { RemoveTask, getTaskData } from "../redux/action"; // Update the import to use removeTask action
import { useHistory, useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import axios from "axios";
import { EDITING } from "../redux/actiontype";

function TaskCard({ title, description, taskdate, _id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(_id);

  async function deleteTask(_id) {
    await dispatch(RemoveTask(_id)); // Wait for the RemoveTask action to complete
    dispatch(getTaskData()); // Dispatch getTaskData after deleting the task
  }

  async function editTask(_id) {
    // const obj = {
    //   title,
    //   description,
    //   taskdate,
    // };
    // const token = localStorage.getItem("Token");
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };
    // try {
    //   let resp = await axios.patch(
    //     `http://localhost:9911/task/updatetask/${_id}`,
    //     obj,
    //     config
    //   ); // Pass obj and config directly to axios.patch
    //   console.log(resp.data); // Log response data for debugging
    // } catch (error) {
    //   console.log(error);
    // }
    dispatch({
      type:EDITING,
      payload:{id:_id}
    })
  }

  return (
    <div className="w-[400px]">
      <Card className="text-left">
        <CardHeader className="flex justify-between items-center">
          <Heading size="md">Client Report</Heading>
          <Box className="flex justify-center items-center">
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
