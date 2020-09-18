import { showMessage } from 'react-native-flash-message'
import { colors } from '../colors'

export const showError = (message) => {
    showMessage({
        message,
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white,
    })
}

export const showSuccess = (message) => {
    showMessage({
        message,
        type: 'default',
        backgroundColor: colors.primary,
        color: colors.white,
    })
}
