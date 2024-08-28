const customHeader = (req, res, next) => {
    console.log(req.headers) // req.body, etc..
    try{
        const apiKey = req.headers.api_key;
        if(apiKey === "jcsimrog-511"){
            next();
        }else{
            rest.status(403);
            rest.send({ error: "El Header API_KEY NO ES CORRECTO"})
        }
    }catch(e){
        res.status(403)
        res.send({ error: "ERROR OCURRIDO EN EL CUSTOM HEADER"} )
    }
}

module.exports = customHeader