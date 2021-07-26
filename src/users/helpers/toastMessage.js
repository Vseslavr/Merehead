export const showSuccessToast = (ref, message) => {
    ref.current.show({
        severity: 'success',
        summary: 'Success Message',
        detail: message,
        life: 2000
    });
};