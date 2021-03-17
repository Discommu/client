import Swal from '../../_snowpack/pkg/sweetalert2.js'
import withReactContent from '../../_snowpack/pkg/sweetalert2-react-content.js'

export const SweetAlert = withReactContent(Swal)

export const successAlert = async ({ title, text, ...args }) => {
    return await SweetAlert.fire({ icon: 'success', title, text, ...args })
}
export const errorAlert = async ({ title, text, ...args }) => {
    return await SweetAlert.fire({ icon: 'error', title, text, ...args })
}
export const confirmAlert = async ({ title, text, confirmButtonText, ...args }) => {
    return await SweetAlert.fire({ icon: 'warning', title, text, confirmButtonText, showCancelButton: true, ...args })
}
export const inputAlert = async ({ title, confirmButtonText, preConfirm, ...args }) => {
    return await SweetAlert.fire({
        title: title,
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        showLoaderOnConfirm: true,
        preConfirm: preConfirm,
        allowOutsideClick: () => !Swal.isLoading()
    })
}