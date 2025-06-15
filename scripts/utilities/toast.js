export function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show', 'animate__animated', 'animate__fadeInUp');
        
        setTimeout(() => {
            toast.classList.remove('show', 'animate__fadeInUp');
            toast.classList.add('animate__fadeOutDown');
            
            setTimeout(() => {
                toast.classList.remove('animate__animated', 'animate__fadeOutDown');
            }, 300);
        }, 3000);
    }
}