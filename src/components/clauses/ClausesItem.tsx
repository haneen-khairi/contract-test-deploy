import React from 'react'
import PlusIcon from './PlusIcon'
import { Flex, Text } from '@chakra-ui/react'

export default function ClausesItem({
    content,
    id,
    onHandleClick
}: ClausesProps) {
  return <div className='clauses__card'>
    <p className="clauses__card--paragraph">{content}</p>
    <button onClick={()=> onHandleClick()}  color='#EE7C21'>
        <Flex alignItems={'center'} gap={'8px'}>
            <PlusIcon /> <Text color='#EE7C21'>Add to Contract</Text>
        </Flex>
        </button>
  </div>
}
