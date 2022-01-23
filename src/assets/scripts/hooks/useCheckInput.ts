export function useCheckInput(input: HTMLInputElement) {
    switch (input.name) {
        case 'name':
        case 'city':
        case 'phone':
            return (input.value.trim() === "")
        case 'email':
            return !/.+@.+\..+/ig.test(input.value.trim());
        default:
            return false
    }
}
