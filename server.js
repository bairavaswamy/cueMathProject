import express from "express"
import http from "http"
import { Server } from "socket.io";
import pathObj from 'path';
import {fileURLToPath} from 'url';

const selectedFile = fileURLToPath(import.meta.url);
const directoryPath = pathObj.dirname(selectedFile);

const app = express();

const server = http.createServer(app)

app.get("/",(request,response)=>{
    response.sendFile(pathObj.join(directoryPath,"/index.html"))
})
server.listen(3000,()=>{
    console.log("listing .... ")
})