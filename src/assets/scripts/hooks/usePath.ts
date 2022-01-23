export function usePath(): string {
    if (window.location.protocol === 'https:') return 'https://obratnokbogu.ru'
    if (window.location.protocol === 'http:') return 'http://obratnokbogu'
    return ""
}