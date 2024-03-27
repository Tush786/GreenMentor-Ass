import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

function LandingPage() {
  return (
    <div>
    <h1>Task</h1>
    <Box>
      <Flex>
        <Box className='bg-black'>
             <Box></Box>
             <Box>
                <Box className="flex">
                    <Box>
                        <Image src='' alt=''></Image>
                    </Box>
                    <Box>
                        <Box>
                            <Text>Start WIth Smaller Task</Text>
                        </Box>
                        <Box>
                            <Text>This Help You Clear your less important but necessary task and make more room for the big tasks that require time</Text>
                        </Box>
                    </Box>
                </Box>
                <Box></Box>
                <Box></Box>
             </Box>
        </Box>
        <Box>

        </Box>
      </Flex>
    </Box>
      
    </div>
  )
}

export default LandingPage
