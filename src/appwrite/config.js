import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query }  from "appwrite";

class service{
  client = new Client();
  Databases;
  Storage;
  constructor(){
    this.client
    .setEndpoint(conf.appwriteurl)
    .setProject(conf.appwriteprojectid);
     this.database=new Databases(this.client)
    this.storage=new Storage(this.client)
  }
  async createpost({title,slug,content,featuredimage,status,userId}){
    try {
        return await this.database.createDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug,
            { title,
                content,
                featuredimage,
                status,
                userId
             }
        );
    } catch (error) {
        throw error
    }
  }
  async updatedocument(slug,{title,content,featuredimage,status}){
   try {
    return  await this.database.updateDocument(
         conf.appwritedatabaseid, 
         conf.appwritecollectionid, 
        slug, 
         {
            title,
           content,
           featuredimage,
           status
         }, 
         
     );
   } catch (error) {
     throw error
   }

  }
  async deletedocument(slug){
    try {
        await this.database.deleteDocument(
            conf.appwritedatabaseid, // databaseId
            conf.appwritecollectionid, // collectionId
            slug // documentId
        );
        return true
    } catch (error) {
        throw error
        return false
    }
  }
  async getdocument(slug){
    try {
        return await this.database.getDocument(
            conf.appwritedatabaseid, // databaseId
        conf.appwritecollectionid, // collectionId
            slug, // documentId
            [] // queries (optional)
        );
    } catch (error) {
        throw error
    }
  }
  async getselecteddocument(query=[Query.equal("status", "active")]){
    try {
        return await this.database.listDocuments(
            conf.appwritedatabaseid, // databaseId
           conf.appwritecollectionid, // collectionId
            query // queries (optional)
        );
    } catch (error) {
        console(`select data error has occured ${error}`);
    }
}
    async uploadfile(file){
            try {
                return await this.storage.createFile(
                    conf.appwritebucketid, // bucketId
                    ID.unique(), // fileId
                    file
                );         
            } catch (error) {
                console.log(`the error has occured while file is uploaded ${error}`)
            }
    }
    async deletefile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwritebucketid, // bucketId
                fileId // fileId
            );
        } catch (error) {
            console.log(`the error has occured while file is uploaded ${error}`)
        }
    }
     getfilepreview(fileId){
        try {
            console.log(fileId)
           const filepreview= this.storage.getFilePreview(
                conf.appwritebucketid, // bucketId
                fileId

            );
            console.log(filepreview)
            return filepreview;
        } catch (error) {
            console.log(`An error has occured while file preview ${error}`)
        }
    }


}
const serviceobj=new service()
export default serviceobj;