import { Stack,Skeleton} from '@mui/material'
import React from 'react'

function PageLoader() {
  return (
 
    <Stack spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Skeleton variant="rectangular"  sx={{borderRadius:'8px'}} width={200} height={50} />
                <Skeleton variant="rectangular" sx={{borderRadius:'16px'}}  width={100} height={50} />
          </Stack>
   
    <Skeleton variant="rectangular" sx={{borderRadius:'16px'}}  width="100%" height={250} />
    <Skeleton variant="rectangular" sx={{borderRadius:'16px'}}  width="100%" height={400} />
    </Stack>
    
  )
}

export default PageLoader