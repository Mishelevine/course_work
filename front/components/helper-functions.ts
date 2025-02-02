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

export function DateToDbForm(date: string) {
    const dateParts = date.split('.')
    return new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)
}

export function DeleteRowTable(from: string, id: number) {
    axios.delete(API_URL + `/${from}/${id}/delete`)
    .then(() => {
        console.log("Deleted row with id =", id)
    })
    .catch((e) => {
        console.log("Error while deleting row")
        console.log(e)
    })
}

export function DatetimeFromDbForm(date: string) {
    const dateSubstr = date.substring(0, 19)
    console.log(dateSubstr)
    const dateTimeSplit = dateSubstr.split('T')
    const dateSplit = dateTimeSplit[0].split('-')
    const normalDate = dateSplit[2] + '.' + dateSplit[1] + '.' + dateSplit[0] + ' ' + dateTimeSplit[1]

    return normalDate
}

export function DateFromDbForm(date: string) {
    const dateSubstr = date.substring(0, 19)
    const dateTimeSplit = dateSubstr.split('T')
    const dateSplit = dateTimeSplit[0].split('-')
    const normalDate = dateSplit[2] + '.' + dateSplit[1] + '.' + dateSplit[0]

    return normalDate
}
