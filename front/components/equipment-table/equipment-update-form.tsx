"use client"

import React from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"

import { Button } from "../ui/button";
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { FormError } from "../form-error";
import { EquipmentFormSchema, TypeSchema } from "@/schemas";

import FormTextField from "../form-text-field";
import FormComboboxField from "../form-combobox-field";

import { useToast } from "@/hooks/use-toast";


const EquipmentUpdateForm = ({
    id
} : {
    id: number
}) => {
  return (
    <div>EquipmentUpdateForm</div>
  )
}

export default EquipmentUpdateForm
