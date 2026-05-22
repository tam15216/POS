import Swal from "sweetalert2";

export const confirmProductAction = async (isEdit) => {
    return await Swal.fire({
        title: isEdit ? 'Confirm Edit' : 'Confirm Create',
        text: isEdit ? 'Are you sure you want to edit this product?' : 'Are you sure you want to create this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: isEdit ? 'Edit Product' : 'Create Product',     
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',

    });
}