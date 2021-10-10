import {useState, useEffect} from 'react';
import {Button, Box, Flex, Text} from 'rebass/styled-components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";


import {ModalBox, Avtar} from '../../components';
import {joinChat, setAvatar} from '../../helpers/actions';
import {USER_TYPE, AVATAR_NAMES} from '../../helpers/constants';

const Wrapper = styled(Box)`
margin-top:100px;
`
const AvatarBox = styled(Box)`
cursor:pointer;
`

function Welcome(props) {


    const [isOpen,setOpen] = useState(false);
    const history = useHistory();

    
    const openModal = ()=> setOpen(true);
    const closeModal = ()=> setOpen(false);

    const socketConReq = ()=>{
      props.dispatch(joinChat());
    };
    const avatarClick = (avatarRank) => {
      props.dispatch(setAvatar(avatarRank));
      history.push('/chat-room');
    }

    useEffect(()=>{
      if(props.userType===USER_TYPE.USER){
        history.push('/chat-room');
      }else if(props.userType===USER_TYPE.SUPER){
        openModal();
      }
      /* eslint-disable */
    },[props.userType])

     
  return (
    <>
      <Wrapper>
        <center>
          <h3>Welcome, to public chat room.</h3>
          <Button variant='outline' mr={2} onClick={socketConReq}>JOIN CHAT</Button>
        </center>
        </Wrapper>
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
              AVATAR_NAMES.map((ele,index)=>{
                return <Flex alignItems='center' 
                              flexDirection='row' 
                              style={{borderBottom: '1px solid'}}
                              mb={'6px'}
                              justifyContent='center' 
                              key={index}
                              >
                                <AvatarBox onClick={()=>avatarClick(index+1)}>
                                  <Avtar src={`../../assets/nerd_${index+1}`}/>
                                </AvatarBox>
                                <Text as = "p" fontSize={[ 3 ]} ml={'10px'}>{ele}</Text>
                      </Flex>
              })
            }
          </Box>
        </ModalBox>
      </>
  );
}

const mapStateToProps = function(state) {
  return {
    userType: state.userType,
    socketConnection: state.socketConnection
  }
}

export default connect (mapStateToProps)(Welcome);
