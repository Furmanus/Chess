// @ts-ignore
import {store as notificationsStore} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
import {appPageTranslations, Languages} from '../constants/app_translations';
import {translate} from './utils';

function showNotification(title: string, message: string): void {
    notificationsStore.addNotification({
        title: title,
        message: message,
        type: 'default',
        container: 'top-right',
        animationIn: ['animated', 'slideInRight'],
        animationOut: ['animated', 'slideOutUp'],
        dismiss: {
            duration: 4000,
            pauseOnHover: true,
        }
    });
}
export function showPlayerJoinedGameNotification(playerName: string): void {
    showNotification(
        appPageTranslations[Languages.EN].games.notification.playerJoin.title,
        translate(appPageTranslations[Languages.EN].games.notification.playerJoin.message, {playerName}),
    );
}
export function showGameCreatedNotification(): void {
    showNotification(
        appPageTranslations[Languages.EN].games.notification.gameCreated.title,
        appPageTranslations[Languages.EN].games.notification.gameCreated.message,
    );
}