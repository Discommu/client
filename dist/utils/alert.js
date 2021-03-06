import Swal from '../../_snowpack/pkg/sweetalert2.js'
import withReactContent from '../../_snowpack/pkg/sweetalert2-react-content.js'

export const SweetAlert = withReactContent(Swal)
export const errorAlert = async ({ title, text, ...args }) => {
    return await SweetAlert.fire({ icon: 'error', title, text, ...args })
}