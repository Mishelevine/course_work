"use client"

import EquipmentSpecsTable from "@/components/equipment-specs-table/equipment-specs-table";
import EquipmentStatusTable from "@/components/equipment-status-table/equipment-status-table";
import EquipmentTable from "@/components/equipment-table/equipment-table";
import { Separator } from "@/components/ui/separator";
import React from "react";

const EquipmentStatusPage = (props:  {params: Promise<{ id: string }>}) => {
  const id = Number(React.use(props.params).id)
  console.log(id)
  return (
    <section className='flex size-full flex-col gap-5
      bg-light-3 p-6 rounded-[14px] border shadow-sm max-sm:w-screen'
    >
      <EquipmentTable forStatus={true} equipmentId={id}/>
      <Separator className="bg-gray-300"/>
      <EquipmentSpecsTable equipmentId={id}/>
      <Separator className="bg-gray-300"/>
      <EquipmentStatusTable equipmentId={id}/>
    </section>
  )
};

export default EquipmentStatusPage;

// const EquipmentStatusPage = async (props:  {params: Promise<{ id: string }>}) => {
//   const params = await props.params;
