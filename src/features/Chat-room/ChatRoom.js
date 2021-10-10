import {connect} from 'react-redux';
import {Container} from 'reactstrap';
import {Button, Box, Flex, Text} from 'rebass/styled-components';
import {useState,useEffect} from 'react';
import styled from 'styled-components';
import { Input} from '@rebass/forms';

import {sendMsg} from '../../helpers/actions';
import {USER_EVENT,USER_TYPE, SOCKET_CONSTANTS} from '../../helpers/constants';
import {ModalBox, Avtar, Grid} from '../../components';
import {apiService} from '../../helpers/apiServices';

const AvatarBox = styled(Box)`
    cursor:pointer;
`
const PostSection= styled(Box)`
    min-height: ${props=>props.userType==='SUPER_USER'?'75vh':'90vh'};
    border:2px solid #1D31F9;
    border-radius:5px;
    overflow-y:auto;
    max-height:500px;
    `
const CommentBox = styled(Box)`
    min-height: 10vh;
    border:1px solid black;
    margin-top:10px;
`

const ChatRoom = (props)=>{

    const [isOpen,setOpen] = useState(false);
    const [userComment, setComment] = useState("");
    const [post,setPosts] = useState([]);

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

    const handleSubmit = (el)=>{
        el.preventDefault();
        setComment("")
        console.log('1')
    }

    const checkIsSuperUser = ()=>{
        if(props.userType===USER_TYPE.SUPER){
            debugger;
            props.dispatch(sendMsg({type:USER_EVENT.EXIT,query:""}));
        }
    };

    useEffect(()=>{
        apiService.getData('http://localhost:3001/fetchPost',{timestamp:Math.floor(Date.now() / 1000)}) 
                    .then((res)=>{
                        setPosts(res.data);
                    })
                    .catch((e)=>console.error(e));

        window.onbeforeunload = (event)=>{
            checkIsSuperUser();
            const e = event || window.event;
            // Cancel the event
            e.preventDefault();
            if (e) {
                e.returnValue = ''; 
            }
            return '';
        }   
        /* eslint-disable*/
    },[]);
   
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
                    {[1,4,4].map((el,index)=>{
                            return (
                                <Grid name={'Kayzeey'} 
                                     index={1} ts={111111111111111} 
                                     content={'AGAGGAGAGAGAGGAGAGAGAGAGAGAGAGAAG'}
                                     key={index}
                                />
                            )
                    })}
                </PostSection>
                {props.userType==='SUPER_USER'&&
                <CommentBox p={2}>
                    <form onSubmit={handleSubmit}>   
                        <Flex flexDirection='row'>
                            {props.socketConnection===SOCKET_CONSTANTS.CONNECTED ?
                            <Input
                                id='post'
                                type='text'
                                value={userComment}
                                onChange={saveComment}
                                placeholder='Type your message & press Enter'
                            />:<Text
                                as="p"
                                fontSize={[ 2 ]}
                                color='#1D31F9'
                                textAlign="center"
                                mb={'20px'}>
                                Please try reconnecting again!
                            </Text>}
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
        socketConnection:state.socketConnection,
    }
}
export default connect(mapStateToProps)(ChatRoom);