const convertToNepaliCurrency = (amount: number): string => {
    if (amount >= 10000000) {
        let crore = Math.floor(amount / 10000000)
        let remainder = amount % 10000000
        return (
            crore +
            'cr' +
            (remainder > 0 ? ' ' + convertToNepaliCurrency(remainder) : '')
        )
    } else if (amount >= 100000) {
        let lakh = Math.floor(amount / 100000)
        let remainder = amount % 100000
        return (
            lakh +
            'la' +
            (remainder > 0 ? ' ' + convertToNepaliCurrency(remainder) : '')
        )
    } else {
        return amount.toString()
    }
}

export default convertToNepaliCurrency
