const {connect} = require("mongoose")
// mongodb+srv://federicoaosandon:Federico1@cluster0.an130di.mongodb.net/coderhouse?retryWrites=true&w=majority
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017/comision32270'
module.exports = {
    dbConection: async ()=>{
        try {
            const conectDB = await connect(mongo_url)
            console.log(`DB conected`)
        } catch (error) {
            console.log(error)
        }
    }
}

// defe014/imagen:version
// docker tag userscreator defe014/userscreator:1.0.0
// docker push defe014/userscreator:1.0.0

// kubectl
// curl.exe -LO "https://dl.k8s.io/release/v1.25.0/bin/windows/amd64/kubectl.exe"
// kubectl version --short

// minikube 
// https://minikube.sigs.k8s.io/docs/start/ -> descarga

// kubectl cluster-info

