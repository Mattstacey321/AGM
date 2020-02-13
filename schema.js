const { gql,AuthenticationError } = require('apollo-server');
const { makeExecutableSchema } = require('apollo-server-express');
const Resolvers = require('./resolver');

const typeDefs = gql`
    
    union ResultTest= Room|Game  
    scalar Upload
    scalar Date
    type Query{
        generateToken(id:String!):String
        test:[ResultTest]
        allMessage:[ListMessage]
        getAllRoom:[Room]
        RmvMbFrRoom(type:String!,idUser:String,idRoom:String):Result
        editRoom(idRoom:ID!,newData:RoomInput):Result
        changeHost(oldHost:String!,newHost:String!):[Room]
        getRoomByUser(idUser:String,name:String):[Room]
        getAllRoomChat:[RoomChat]
        getRoomJoin(UserID:String):[Room]
        joinRoomChat(roomID:String,userID:String,Info:Info):ResultCRUD
        addMember(id_room:String!,id_user:String!):Result
        chatGroup(id_room:String!,chat_message:MessageInput):Result
        getAllMessage(id_room:String!):RoomChat
        findRoomByName(room_name:String!):[Room]
        getListGame(limit:Int!):[Game]
        getRandomGame:[Game]
        getGameByGenre(type:String!):[Game]
        approveList_Host(hostID:String!):[ApproveList]
        approveList_User(userID:String!):[ApproveList]
       
        
    }
    type gameInfo{
        gameID:String!
        gameName:String!
    }
    input Info{
        userID:String!,
        roomID:String!
    }
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
      }
    type ApproveList{
        userID:String
        roomID:String
        isApprove:Boolean
    }
    type Room implements AuthResponse{
        _id:ID!
        roomName:String!
        idUser:String!
        hostID:String
        isPrivate:Boolean
        description:String
        game:gameInfo
        member:[String]
        maxOfMember:Int
        createAt:Date
        status:String!
    }
  
    type Game{
        _id:ID!
        game_name:String
        genres:[String]
        platforms:[String]
        popularity:String
        logo:String
        image(limit:Int):[String]
        cover_image:String
    }
    type Message{
        _id:ID
        userID:String
        text:String
        datetime:String
    }
    type ListMessage{
        userID:String!
        listmessage:[Message]
    }
  
    
    type JoinRoomResponse implements MutationResponse{
        status:String
        success: Boolean!
        message: String!
    
    }
    type UploadImage implements MutationResponse{
        code: String!
        success: Boolean!
        message: String!
        image_url:String
    }
    
    interface MutationResponse {
        success: Boolean!
        message: String!
    }
    interface AuthResponse{
        status:String!
    }
    
    type Result{
      data:Room
      status:String
      result:Boolean
    }
    type ResultCRUD implements MutationResponse{
        status:String
        success:Boolean!
        message:String!
    }
  
    type RoomChat{
        _id:ID!
        roomID:String
        member:[String]
        messages:[
            Message
        ]
    }
    type PrivateMessage{
        id_user:String
        pendingMessage:[
            pendingMessages
        ]
        incommingMessage:[
            incommingMessages
        ]

    }
    type pendingMessages{
        id_user:String
        message:[String]
        time:String
    }
    type incommingMessages{
        id_friend:String
        message:[String]
        time:String
    }
    
    input message{
        id_user:String
        pendingMessage:[
            pendingMessage
        ]
        incommingMessage:[
            privateMessage
        ]
    }
    input pendingMessage{
        id_user:String,
        messages:[String],
        time:String
    }
    input privateMessage{
        id_friend:String
        message:[String]
        time:String
    }
    input newMessage{
        username:String!
        listmessage:[
            MessageInput
        ]
    }
    input RoomInput{
        roomName:String!
        isPrivate:Boolean!
        hostID:String!
        description:String
        member:[String]!
        maxMember:Int!
        game:GameInfo
    }
   
    input GameInfo{
        id:String!
        name:String!
    }
   
    input MessageInput{
        userID:String
        text:String
        createAt:String
    }
  
    input RoomChatInput{
        member:[
            String
        ]
        messages:[
            MessageInput
        ]
        createAt:Date
    }
    input GameInput{
        _id:ID
        game_name:String
        genres:[String]
        platforms:[String]
        popularity:String
        tag:[String]
        logo:String
        image:[String]
    }
     
    type Mutation{
        createGame(input:GameInput):Game
        createRoomChat(input:RoomChatInput):RoomChat
        createRoom(userID:String,roomInput: RoomInput,roomChatInput:RoomChatInput):ResultCRUD
        removeRoom(roomID:ID!,userID:String!):ResultCRUD
        chatPrivate(id_user:String,id_friend:String,input:message):PrivateMessage
        chatUpdate(name:String!,input:MessageInput):ListMessage
        joinRoom(roomID:String!,currentUserID:String!,info:Info!):ResultCRUD
        upload(file: Upload!,userID:String,type:Int):UploadImage
    }
`;


const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers:
        Resolvers,
    
});
module.exports = schema;
