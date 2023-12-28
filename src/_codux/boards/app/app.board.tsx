import { createBoard } from '@wixc3/react-board';
import App from '../../../App';

export default createBoard({
    name: 'App',
    Board: () => <App />,
    environmentProps: {
        canvasPadding: {
            left: 0,
        },
        windowBackgroundColor: '#f5f5f6',
        canvasBackgroundColor: 'rgba(146, 146, 146, 0.19)',
        canvasWidth: 592,
        windowHeight: 560, windowWidth: 800, canvasHeight: 450
    },
    isSnippet: false
});
