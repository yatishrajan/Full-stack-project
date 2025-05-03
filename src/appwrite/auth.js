import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";



class authservice{
    client = new Client()
    account;
    constructor(){
             this.client.setProject('679b002f00221a1acadc');
            this.client
        .setEndpoint(conf.appwriteurl) // Your API Endpoint
        .setProject(conf.appwriteprojectid);  
        this.account=new Account(this.client); 
    }
   async createaccount({email,password,name}){
    try {
        console.log(`email is :${email}`)
      const useraccount=await this.account.create(
            ID.unique(), 
            email, 
            password,
            name
        );
        console.log('check if user account is created in auth ,',useraccount);
        return useraccount;
        // if(useraccount){
        //     const ligindata= this.loginaccount({email,password});
        //     console.log(`the login data ${(await ligindata).$id}`)
        //     return ligindata
        // }else{
        //     return useraccount
        // }
    } catch (error) {
        throw error
    }
    }
    async  loginaccount({email,password}){
        try {
            console.log(`my email is ${email}`)
            console.log(`My password is ${password}`)
          return await  this.account.createEmailPasswordSession(
                email, 
                password
            );
        } catch (error) {
            
            throw error
        }
    }
    async getcurrentstate(){
        try {
            console.log("imp")
           const aaaa=await this.account.get();
           console.log("the user data in getcuttent data auth ",aaaa)
           return aaaa;
        } catch (error) {
            console.log("if error in getcurrent user in auth ",error)
            throw error
        }
        
    }
    async logout(){
        try {
           await  this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
      
}
const  autserobj=new authservice();
export default autserobj;