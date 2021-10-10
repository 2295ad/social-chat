import {connect} from 'react-redux';
import {Container} from 'reactstrap';
import {Button, Box, Flex, Text} from 'rebass/styled-components';
import {useState} from 'react';
import styled from 'styled-components';
import { Input} from '@rebass/forms';



import {sendMsg} from '../../helpers/actions';
import {USER_EVENT} from '../../helpers/constants';
import {ModalBox, Avtar} from '../../components';



const ChatRoom = (props)=>{

    const [isOpen,setOpen] = useState(false);
    const [userComment, setComment] = useState("");

    const AvatarBox = styled(Box)`
        cursor:pointer;
      `
    const PostSection= styled(Box)`
        min-height: ${props=>props.userType==='SUPER_USER'?'75vh':'90vh'};
        border:1px solid black;
        user:${props.userType==='SUPER_USER'};
    `
    const CommentBox = styled(Box)`
        min-height: 10vh;
        border:1px solid black;
        margin-top:10px;
    `


    const openModal = ()=> setOpen(true);
    const closeModal = ()=> setOpen(false);
    const saveComment = (el) => {
        el.preventDefault();
        setComment(el.target.value)
    };
    const setSuperUser = ()=>{
        props.dispatch(sendMsg({type:USER_EVENT.SET_SUPER_USER,query:""}));
        closeModal();
    }

    const handleSubmit = ()=>{
        setComment("")
        console.log('1')
    }
   
    return(
        <Container>
            <Flex 
                alignItems='center' 
                flexDirection='row' 
                mb={'6px'}
                justifyContent='center' >
                {props.superUserNudge && 
                <Flex alignItems='baseline' flexDirection='row' mb={'10px'} mt={'10px'} >
                    <Button variant='outline' mr={2} onClick={()=>openModal()}>
                        Choose Avatar
                    </Button>
                    <Text
                        as="p"
                        fontSize={[ 4 ]}
                        color='#1D31F9'
                        textAlign="center"
                        mb={'20px'}>
                        Super user available, choose your avatar & post!
                    </Text>
                </Flex>
                }
            </Flex>

            <ModalBox 
                isOpen={isOpen}
                onClose={closeModal}
                heading={"Choose your Avatar"}>
                <Box>
                    <Text
                        as="p"
                        fontSize={[ 5 ]}
                        color='#1D31F9'
                        textAlign="center"
                        mb={'20px'}>
                        Choose your Avatar
                    </Text>
                    {   
                    ['Rayman','Kayzee','Nerddy','Hacker','Queenn'].map((ele,index)=>{
                        return <Flex alignItems='center' 
                                    flexDirection='row' 
                                    style={{borderBottom: '1px solid'}}
                                    mb={'6px'}
                                    justifyContent='center' 
                                    key={index}
                                    >
                                        <AvatarBox onClick={()=>setSuperUser(index+1)}>
                                        <Avtar src={`../../assets/nerd_${index+1}`}/>
                                        </AvatarBox>
                                        <Text as = "p" fontSize={[ 3 ]} ml={'10px'}>{ele}</Text>
                            </Flex>
                    })
                    }
                </Box>
            </ModalBox>

            <Flex flexDirection='column'>
                <PostSection pb={2} userType={props.userType} >
                    <Text p={1} color='background' bg='primary'>
                    Half
                    </Text>
                </PostSection>
                {props.userType==='SUPER_USER'&&
                <CommentBox p={2}>
                    <form onSubmit={handleSubmit}>
                    
                        <Flex flexDirection='row'>
                            <Input
                                id='post'
                                type='text'
                                value={userComment}
                                onChange={saveComment}
                                placeholder='Type your message & press Enter'
                            />
                        </Flex>
                    </form>
                </CommentBox>
                }
            </Flex>
        </Container>
    )
}

const mapStateToProps = function(state){
    return{
        userType:state.userType,
        superUserNudge:state.superUserNudge,
    }
}
export default connect(mapStateToProps)(ChatRoom);