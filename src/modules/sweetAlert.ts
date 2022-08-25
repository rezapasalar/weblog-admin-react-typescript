const swal: any = require('sweetalert2')

class SweetAlert {
    public toast (type: string, title: string, timer: number = 3000, position: string = 'bottom-end'): void {
        swal.fire({
            title,
            position,
            timer,
            toast: true,
            showConfirmButton: false,
            timerProgressBar: true,
            iconColor: '#fff',
            color: '#fff',
            icon: type === 'success' ? 'success' : 'error',
            background: type === 'success' ? 'rgb(21 128 61)' : 'rgb(185 28 28)',
            showCloseButton: true,
            didOpen: (toast: any) => {
                toast.addEventListener('mouseenter', swal.stopTimer)
                toast.addEventListener('mouseleave', swal.resumeTimer)
            }
        })
    }
    
    public question (html: string = 'آیا اطمینان دارید؟', confirmButtonText: string = 'بلی', cancelButtonText: string = 'خیر'): Promise<any> {
        return new Promise((resolve) => {
            return swal.fire({
                icon: 'question',
                html,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText,
                cancelButtonText
            }).then((result: any) => {
                if(result.isConfirmed) return resolve(true)
                return resolve(false)
            })
        })
    }
}

export default new SweetAlert()