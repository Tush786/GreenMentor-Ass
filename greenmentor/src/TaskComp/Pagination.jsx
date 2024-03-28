// import { Button, useStatStyles } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { getTaskData } from '../redux/action';

// function Pagination() {
   
//     const dispatch=useDispatch();
//     function HandlePrev(){
//        setPage(page-1);
//        dispatch(getTaskData(page,limit))
//     }

//     function HandleNext(){
//         setPage(page+1);
//         dispatch(getTaskData(page,limit))
//     }
//   return (
//     <div>
//       <Button disabled={page==1} onClick={HandlePrev}>Prev</Button>
//       <Button>{page}</Button>
//       <Button disabled={page==5} onClick={HandleNext}>Next</Button>
//     </div>
//   )
// }

// export default Pagination
