const { gql,AuthenticationError } = require('apollo-server');
const { makeExecutableSchema } = require('apollo-server-express');
const Resolvers = require('./resolver');

const typeDefs = gql`
    
    union ResultTest= Room|Game  
    scalar Upload
    type Query{
        generateToken(id:String!):String
        test:[ResultTest]
        allMessage:[ListMessage]
        getAllRoom:[Room]
        getAllUser:[User]
        allGlobalRoom(qty:Int,name:String):[GlobalMessage]
        RmvMbFrRoom(type:String!,idUser:String,idRoom:String):Result
        EditRoom(idRoom:ID!,newData:RoomInput):Result
        ChangeHost(oldHost:String!,newHost:String!):[Room]
        getRoomByUser(idUser:String,name:String):[Room]
        getAllRoomChat:[RoomChat]
        getRoomJoin(UserID:String):[Room]
        onJoinRoomChat(id_room:String,id_user:String):JoinRoomResult
        addMember(id_room:String!,id_user:String!):Result
        onChatGroup(id_room:String!,chat_message:MessageInput):Result
        getAllMessage(id_room:String!):RoomChat
        findRoomByName(room_name:String!):[Room]
        getListGame(limit:Int!):[Game]
        getRandomGame:[Game]
        getGameByGenre(type:String!):[Game]
       
        
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
        isPrivate:Boolean
        description:String
        game:gameInfo
        member:[String]
        maxOfMember:Int
        status:String!
    }
    type gameInfo{
        idGame:String!
        gameName:String!
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
    interface AuthResponse{
        status:String!
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
        idUser:String!
        description:String
        member:[String]!
        maxMember:Int!
        game:GameInfo
    }
    input GameInfo{
        id:String!
        name:String!
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
        createRoom(userID:String,roomInput: RoomInput):CreateResult
        RemoveRoom(idRoom:ID!,userID:String!):ResultCRUD
        approveList_Host(hostID:String!):[ApproveList]
        approveList_User(userID:String!):[ApproveList]
        createUser(input:UserInput):User
        onChatGlobal(which_game:String!,input: MessageGlobalInput):GlobalMessage
        onChat(input:newMessage):ListMessage
        onChatPrivate(id_user:String,id_friend:String,input:message):PrivateMessage
        onChatUpdate(name:String!,input:MessageInput):ListMessage
        onJoinRoom(id_room:String!,id_user:String):JoinRoomResponse
        createChatGlobal(input:MessageGlobalInput ):GlobalMessage
        upload(file: Upload!,userID:String,type:Int):UploadImage
        
       
    }
`;


const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers:
        Resolvers,
    
});
module.exports = schema;
