import React,{useCallback, useEffect,useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import autserobj from '../../appwrite/auth.js'
import Button from '../Button.jsx'
import Input from '../Input.jsx'
import Select from '../Select.jsx'
import serviceobj from '../../appwrite/config.js'
import RTE from '../RTE.jsx'

function Postform({post}){
    
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm(
                { defaultValue:{
                    title: post?.title || "",
                    slug: post?.$id || "",
                    content: post?.content || "",
                    status: post?.status || "active",
                }}
    )

      
        const navigate=useNavigate();
        const userdata = useSelector((state) => state.authservice.userdata);

       
        
        const submit=async(data)=>{
            
               if(post){
                   const file=data.image[0]? await serviceobj.uploadfile(data.image[0]):null;
                   if(file){
                            serviceobj.deletefile(post.featuredImage)
                   }
                   const dbstore= await serviceobj.updatedocument(post.$id,{...data,featuredImage:file? file.$id:undefined})
                   if(dbstore){
                    
                    navigate(`/post/${dbstore.$id}`)
                   }
               }else{
                     const file=data.image[0]? await serviceobj.uploadfile(data.image[0]):undefined
                     if(file){
                        const fileid=file.$id
                        data.featuredimage=fileid
                      console.log("user data 2 ",userdata)
                        const dbstore= await serviceobj.createpost({...data,userId:userdata.$id})
                        if(dbstore){
                            console.log("the check of data store ",dbstore.$id)
                            navigate(`/post/${dbstore.$id}`)
                        }
                     }
               }
            }
      
              const slugTransform=useCallback((values)=>{
                if(values && typeof values=="string"){
                    return values
                          .trim()
                          .toLowerCase()
                          .replace(/[^a-zA-Z\d\s]+/g, "-")
                          .replace(/\s/g, "-");
                        //   .replace(/^[a-bA-B\d\s]+/g,"-")
                        //   .replace(/\s/g,"-")
                    }
                    return ""
               },[])
               React.useEffect(() => {
                const subscription = watch((value, { name }) => {
                    if (name === "title") {
                        setValue("slug", slugTransform(value.title), { shouldValidate: true });
                    }
                });
        
                return () => subscription.unsubscribe();
            }, [watch, slugTransform, setValue]);
        
        return (
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    {console.log("user data",userdata)}
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        );

}
export default Postform;
