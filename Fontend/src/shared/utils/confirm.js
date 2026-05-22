import Swal from "sweetalert2";

export const confirmProductAction = async (isEdit) => {
    return await Swal.fire({
        title: isEdit ? 'ยืนยันการแก้ไข' : 'ยืนยันการสร้าง',
        text: isEdit ? 'คุณแน่ใจหรือไม่ที่จะแก้ไขสินค้านี้?' : 'คุณแน่ใจหรือไม่ที่จะสร้างสินค้าใหม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: isEdit ? 'แก้ไขสินค้า' : 'สร้างสินค้า',     
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: '#3085d6',

    });
}