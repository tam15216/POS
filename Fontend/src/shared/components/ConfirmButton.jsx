import Swal from 'sweetalert2';

export default function ConfirmButton({
    title,
    text,
    icon,
    onConfirm,
    children,
    className
}) {

    const handleClick = async () => {

        const result = await Swal.fire({
            title,
            text,
            icon,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#ef4444'
        });

        if (result.isConfirmed) {
            onConfirm();
        }
    };

    return (

        <button
            onClick={handleClick}
            className={className}
        >
            {children}
        </button>

    );
}