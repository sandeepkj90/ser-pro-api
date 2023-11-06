const CustomeResponse = {
    sendResponse:(status,data,message)=>{
        return {
            status:status,
            data:data||'',
            message:message||''
        }
    }
}
module.exports = CustomeResponse;