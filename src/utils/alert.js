import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const SweetAlert = withReactContent(Swal)
export const errorAlert = async ({ title, text, ...args }) => {
    return await SweetAlert.fire({ icon: 'error', title, text, ...args })
}