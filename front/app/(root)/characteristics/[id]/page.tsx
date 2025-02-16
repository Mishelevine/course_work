"use client"

import EquipmentSpecsTable from "@/components/equipment-specs-table/equipment-specs-table";
import EquipmentStatusTable from "@/components/equipment-status-table/equipment-status-table";
import EquipmentTable from "@/components/equipment-table/equipment-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const EquipmentStatusPage = (props:  {params: Promise<{ id: string }>}) => {
  const id = Number(React.use(props.params).id)
  console.log(id)
  return (
    <section className='flex size-full flex-col gap-5
      bg-light-3 p-6 rounded-[14px] border shadow-sm max-sm:w-screen'
    >
      <Card>
        <CardHeader>
          <CardTitle>Оборудование</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300"/>
        <CardContent className="space-y-2 py-4">
          <EquipmentTable forStatus={true} equipmentId={id} userRole={0}/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Характеристики</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300"/>
        <CardContent className="space-y-2">
          <EquipmentSpecsTable equipmentId={id}/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>История статусов</CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300"/>
        <CardContent className="space-y-2">
          <EquipmentStatusTable equipmentId={id}/>
        </CardContent>
      </Card>
    </section>
  )
};

export default EquipmentStatusPage;
