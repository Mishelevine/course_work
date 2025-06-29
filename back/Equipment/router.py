from datetime import datetime, timedelta, timezone
import pandas as pd
import io
import openpyxl
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import pandas as pd
from back.Equipment.schemas import SEquipment, SEquipmentCreate, SEquipmentWithResponsible
from back.Equipment import crud
from back.User.depends import get_current_user
from back.User.models import User

router = APIRouter(
    prefix="/equipment",
    tags=["Оборудование"]
)

@router.get("/to_word/{equipment_id}")
async def generate_equipment_word(equipment_id: int, user: User = Depends(get_current_user)):
    equipment = await crud.get_equipment_for_word(equipment_id)
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")

    doc = Document()
    
    def set_font(paragraph, size, bold=False, align=None):
        run = paragraph.runs[0] if paragraph.runs else paragraph.add_run()
        font = run.font
        font.name = "Times New Roman"
        font.size = Pt(size)
        font.bold = bold
        if align:
            paragraph.alignment = align
        paragraph.paragraph_format.space_after = Pt(0)
    
    p1 = doc.add_paragraph('Национальный исследовательский университет "Высшая школа экономики"\nПермский филиал')
    set_font(p1, 12, bold=True, align=WD_PARAGRAPH_ALIGNMENT.CENTER)
    
    p2 = doc.add_paragraph("\nКАРТОЧКА\nУЧЕТА ОБОРУДОВАНИЯ\n")
    set_font(p2, 14, bold=True, align=WD_PARAGRAPH_ALIGNMENT.CENTER)
    
    fields = [
        ("Наименование:", equipment.type_name),
        ("Модель оборудования:", equipment.model),
        ("Серийный номер:", equipment.serial_number),
        ("Инвентарный номер:", equipment.inventory_number),
        ("Кому выдано:", equipment.responsible_user_full_name if equipment.responsible_user_full_name else "Не указано"),
        ("Подпись:", "_________________________/"),
        ("Подразделение:", equipment.responsible_user_office)
    ]
    
    for field_name, field_value in fields:
        p = doc.add_paragraph()
        run = p.add_run(field_name + " ")
        run.bold = True
        run.font.name = "Times New Roman"
        run.font.size = Pt(12)
        run2 = p.add_run(field_value)
        run2.font.name = "Times New Roman"
        run2.font.size = Pt(12)
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.space_after = Pt(0)
    
    now = datetime.now(tz=timezone(timedelta(hours=5))).strftime("%d/%m/%Y %I:%M:%S %p")
    p_last = doc.add_paragraph(now)
    set_font(p_last, 12, align=WD_PARAGRAPH_ALIGNMENT.RIGHT)

    file_stream = io.BytesIO()
    doc.save(file_stream)
    file_stream.seek(0)

    file_name = f"{equipment.serial_number}.docx"
    return StreamingResponse(
        file_stream,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename={file_name}"}
    )

@router.post("/to_excel_file")
async def generate_equipment_excel(equipment_list: List[SEquipmentWithResponsible], user: User = Depends(get_current_user)):
    if user.system_role_id < 2:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    try:
        equipment_data = await crud.get_equipment_for_excel(user.system_role_id, equipment_list)

        df = pd.DataFrame(equipment_data)

        excel_file = io.BytesIO()
        with pd.ExcelWriter(excel_file, engine="openpyxl") as writer:
            df.to_excel(writer, index=False, sheet_name="Equipment")
        excel_file.seek(0)

        file_name = f"equipment_list_{datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')}.xlsx"

        return StreamingResponse(
            excel_file,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename={file_name}"}
        )

    except Exception as e:
        print(f"Ошибка при генерации Excel-файла: {e}")
        raise HTTPException(status_code=500, detail="Ошибка при генерации Excel-файла")

@router.post("/create", response_model=SEquipment)
async def create_equipment(equipment: SEquipmentCreate):
    db_equipment = await crud.get_equipment_by_serial_number(serial_number=equipment.serial_number)
    if db_equipment:
        raise HTTPException(status_code=400, detail="Equipment with this serial number already exists")
    return await crud.create_equipment(equipment=equipment)

@router.get("/all")
async def get_all_equipment(user: User = Depends(get_current_user)) -> List[SEquipmentWithResponsible]:
    return await crud.get_all_equipment(user_role_id=user.system_role_id)

@router.get("/{equipment_id}", response_model=SEquipment)
async def get_equipment(equipment_id: int):
    equipment = await crud.get_equipment(equipment_id)
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    return equipment

@router.put("/{equipment_id}", response_model=SEquipment)
async def update_equipment(equipment_id: int, updated_equipment: SEquipmentCreate):
    existing_equipment = await crud.get_equipment(equipment_id)
    if not existing_equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    
    return await crud.update_equipment(equipment_id=equipment_id, updated_equipment=updated_equipment)

@router.delete("/{equipment_id}", response_model=dict)
async def delete_equipment(equipment_id: int):
    return await crud.delete_equipment(equipment_id=equipment_id)