import {ChessFigure} from '../../../common/models/chess_figure';

export function mapFiguresToCoords(figures: ChessFigure[]): string[] {
    return figures.map((figure) => `${figure.position.x}x${figure.position.y}`);
}
export function createAnimation(source: HTMLTableCellElement, target: HTMLTableCellElement, dist: number): Promise<void> {
    return new Promise((resolve) => {
        const image = source?.querySelector('img');
        const {
            offsetLeft: sourceOffsetLeft,
            offsetTop: sourceOffsetTop,
        } = source;
        const {
            offsetLeft: targetOffsetLeft,
            offsetTop: targetOffsetTop,
        } = target;
        const diffX = targetOffsetLeft - sourceOffsetLeft;
        const diffY = targetOffsetTop - sourceOffsetTop;

        const imageAnimation = image?.animate([
            {transform: `translate(0, 0`},
            {transform: `translate(${diffX - Math.sign(diffX) * 16}px, ${diffY - Math.sign(diffY) * 16}px)`},
        ], {
            duration: 150 * dist,
            easing: 'ease-in-out',
        });

        imageAnimation?.addEventListener('finish', onAnimationFinish);

        function onAnimationFinish(): void {
            resolve();

            imageAnimation.removeEventListener('finish', onAnimationFinish);
        }
    });

}
