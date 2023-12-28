import { Button } from '@/components/ui/button'
import React, {useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'

type FileUploaderProps ={
    fieldChange: (FILES : File[])=> void,
    mediaURL:string
}
const FIleUploader = ({fieldChange, mediaURL}: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl]= useState(mediaURL)
    const onDrop = useCallback((acceptedFiles :FileWithPath[]) => {
        // Do something with the files
         setFile(acceptedFiles)
         fieldChange(acceptedFiles)
         setFileUrl(URL.createObjectURL(acceptedFiles[0]))
      }, [file])
      const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept:{
            "image/*": [".png",".jpeg", ".jpg" ]
        }
    })
    console.log(fileUrl)

  return (
      <div 
      className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'
      {...getRootProps()}
      >
      <input 
      {...getInputProps()} 
      className='cursor-pointer'
        />
      {
        fileUrl ? (
            <>
            <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            <img 
            src={fileUrl} 
            alt="file-upload"
             />
            </div>
             <p className='file_uploader_label'>Click & Drag Another Photo to Replace</p>
            </>

        ):(
            <div className='file_uploader-box'>
                <img
                src='/assets/icons/file-upload.svg'
                width={96}
                height={77}
                alt='file-upload'
                />
                <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag Photo Here</h3>
                <p className='text-light-4 small-regular mb-6 '>
                JPG, PNG, SVG
                </p>
                <Button className='shad-button_dark_4'>
                    Select From Your Device
                </Button>
            </div>      
        )
      }
    </div>
  )
}

export default FIleUploader