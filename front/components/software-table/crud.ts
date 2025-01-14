import { API_URL } from "@/constants"
import { SoftwareSchema } from "@/schemas"
import { Row } from "@tanstack/react-table"
import axios from "axios"
import { z } from "zod"

export function CorrectPagesCase(pageNum: number) {
    if (pageNum <= 20) {
        return "страниц"
    }

    if (pageNum % 10 == 1) {
        return "страницы"
    }

    return "страниц"
}

export function DeleteRowSoftwareTable(id: number) {
    axios.delete(API_URL + `/software/${id}/delete`)
    .then(() => {
        console.log("Deleted row with id =", id)
    })
    .catch((e) => {
        console.log("Error while deleting row")
        console.log(e)
    })
}
