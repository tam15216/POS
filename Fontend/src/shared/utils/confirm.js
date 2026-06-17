import Swal from "sweetalert2";

export const confirmProductAction = async (isEdit, itemName = "ข้อมูล") => {
    return await Swal.fire({
        title: isEdit ? 'ยืนยันการแก้ไข' : 'ยืนยันการสร้าง',
        text: isEdit 
            ? `คุณแน่ใจหรือไม่ที่จะแก้ไข${itemName}นี้?` 
            : `คุณแน่ใจหรือไม่ที่จะสร้าง${itemName}ใหม่?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: isEdit ? 'ยืนยันแก้ไข' : 'ยืนยันสร้าง',     
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: isEdit ? '#d97706' : '#7c3aed', 
    });
};