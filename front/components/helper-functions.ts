import { API_URL } from "@/constants"
import axios from "axios"

export function CorrectPagesCase(pageNum: number) {
    if (pageNum <= 20) {
        return "страниц"
    }

    if (pageNum % 10 == 1) {
        return "страницы"
    }

    return "страниц"
}

export function DatetimeToDbForm(date: string) {
    const dateParts = date.split('.')
    return new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)
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
