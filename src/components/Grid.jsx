import { Flex, Text} from 'rebass/styled-components';

import Avtar from './Avatar';


const Grid = (props)=>{

    return(
        <Flex flexDirection = 'column' style={{border:'1px solid', borderRadius:'5px'}} m={10}>
            <Flex alignItems='center' 
                              flexDirection='row' >
                <Avtar src={`../../assets/nerd_${props.index}`}/>
                <Text as = "p" fontSize={[ 3 ]} >{props.name}</Text>
            </Flex>
            <Text as = "p" fontSize={[ 1 ]} color='gray' ml={'10px'}>{props.ts}</Text>
            <hr style={{backgroundColor:'black',height:1,width:'100%'}}/>
            <Text as = "p" fontSize={[ 3 ]} m={'5px'}>{props.content}</Text>
        </Flex>
    )
}

export default Grid;