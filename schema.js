const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('apollo-server-express');
const Resolvers = require('./resolver');

const typeDefs = gql`
    
    union ResultTest=  Room | Game  
    scalar Upload
    type Query{
        test:[ResultTest]
        allMessage:[ListMessage]
        allRoom:[Room]
        allUser:[User]
        allGlobalRoom(qty:Int,name:String):[GlobalMessage]
        RmvMbFrRoom(type:String!,idUser:String,idRoom:String):Result
        EditRoom(idRoom:ID!,newData:RoomInput):Result
        ChangeHost(oldHost:String!,newHost:String!):[Room]
        getRoomByUser(idUser:String,name:String):[Room]
        allRoomChat:[RoomChat]
        getRoomJoin(UserID:String):[Room]
        onJoinRoomChat(id_room:String,id_user:String):JoinRoomResult
        addMember(id_room:String!,id_user:String!):Result
        onChatGroup(id_room:String!,chat_message:MessageInput):Result
        getAllMessage(id_room:String!):RoomChat
        findRoomByName(room_name:String!):[Room]
        getListGame(limit:Int):[Game]
     
    }
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
      }
   
    type Room{
        _id:ID!
        room_name:String!
        id_user:String
        isPrivate:Boolean
        password:String
        description:String
        member:[String]
    }
    type Game{
        _id:ID!
        game_name:String
        genres:[String]
        platforms:[String]
        popularity:String
        logo:String
        image:[String]
    }
    type User{
        _id:ID!
        username:String!
        avatar:String!
        isHost:Boolean
    }

    type Message{
        _id:ID
        id_user:String
        text:String
        image:String
        datetime:String
    }
    type ListMessage{
        username:String!
        listmessage:[Message]
    }
    type MessageGlobal{
        username:User
        message:Message
    }
    type GlobalMessage{
        room_name:String
        message:[    
            MessageGlobal
        ]
    }
    
    type JoinRoomResponse implements MutationResponse{
        code: String!
        success: Boolean!
        message: String!
    
    }
    type UploadImage implements MutationResponse{
        code: String!
        success: Boolean!
        message: String!
        image_url:String
    }
    type Upload1{
        image_url:String
    }
    interface MutationResponse {
        code: String!
        success: Boolean!
        message: String!
    }
    
    type Result{
      data:Room
      
      status:String
      result:Boolean
    }
    type ResultCRUD{
        statusCode:String
        result:String
    }


    type CreateResult{
            id_room:String
            result:Boolean
    }
    
    type JoinRoomResult{
        data:RoomChat
        statusCode:String
        result:Boolean
    }
    type RoomChat{
        _id:ID!
        id_room:String
        member:[String]
        messages:[
            Message
        ]
    }
    input newMessage{
        username:String!
        listmessage:[
            MessageInput
        ]
    }
    input RoomInput{
        _id:ID
        room_name:String!
        isPrivate:Boolean
        id_user:String
        password:String
        description:String
        member:[String]
        
    }
    input UserInput{
        _id:ID
        username:String!
        avatar:String!
        isHost:Boolean
    }
    input MessageInput{
        IDUser:String
        text:String
        datetime:String
    }
    input MessageGlobalInput1{
        username:UserInput
        message:String
    }
    input MessageGlobalInput{
        room_name:String
        message:[
            MessageGlobalInput1
        ]
    }
    input RoomChatInput{
        
        id_room:String
        member:[
            UserInput
        ]
        messages:[
            MessageInput
        ]
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
        createRoom(userID:String,chatInput:RoomChatInput,roomInput: RoomInput):CreateResult
        RemoveRoom(id:ID!):ResultCRUD
        
        createUser(input:UserInput):User
        onChatGlobal(which_game:String!,input: MessageGlobalInput):GlobalMessage
        onChat(input:newMessage):ListMessage
        onChatUpdate(name:String!,input:MessageInput):ListMessage
        onJoinRoom(id_room:String!,id_user:String):JoinRoomResponse
        createChatGlobal(input:MessageGlobalInput ):GlobalMessage
        upload(file: Upload!,userID:String,type:Int):UploadImage
        
       
    }
`;


const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers:
        Resolvers  

});
module.exports = schema;
