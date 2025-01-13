export function CorrectPagesCase(pageNum: number){
    if (pageNum <= 20){
        return "страниц"
    }

    if (pageNum % 10 == 1){
        return "страницы"
    }

    return "страниц"
}

export function DeleteRowSoftwareTable(id: number) {
    console.log("Deleted row with id =", id)
}

export function UpdateRowSoftwareTable(id: number) {
    console.log("Updated row with id =", id)
}

export function AddRowSoftwareTable() {
    console.log("Added row")
}
