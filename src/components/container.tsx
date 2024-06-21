
import { Cn } from '@/utils/cn';
import React from 'react'

type props ={}

function Container(props : React.HTMLProps <HTMLDivElement>) {
  return (
   
    <div   {...props}
    className={Cn("w-full bg-white border rounded-xl flex py-4 shadow-sm", props.className)}/>
     
  
  );
}

export default Container
