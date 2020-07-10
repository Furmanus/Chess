import * as React from 'react';
import {Ref, SyntheticEvent} from 'react';
import {AppPageStyledGameBoardCell} from '../../styled/game_board/AppPageStyledGameBoardCell';
import {converNumberToAlphabetLetter} from '../../utils/utils';
import {
    bishopBlackImage,
    bishopWhiteImage,
    kingBlackImage,
    kingWhiteImage,
    knightBlackImage,
    knightWhiteImage,
    pawnBlackImage,
    pawnWhiteImage,
    queenBlackImage,
    queenWhiteImage,
    rookBlackImage,
    rookWhiteImage,
} from '../../../../assets';
import {ChessPieces, PlayerColors} from '../../../../common/helpers/game_helper';
import {boundMethod} from 'autobind-decorator';
import {Coordinates} from '../../../../common/interfaces/game_interfaces';

function getFigureImage(figure: ChessPieces, color: PlayerColors): string {
    switch (color) {
        case PlayerColors.WHITE:
            switch (figure) {
                case ChessPieces.PAWN:
                    return pawnWhiteImage;
                case ChessPieces.KNIGHT:
                    return knightWhiteImage;
                case ChessPieces.BISHOP:
                    return bishopWhiteImage;
                case ChessPieces.ROOK:
                    return rookWhiteImage;
                case ChessPieces.QUEEN:
                    return queenWhiteImage;
                case ChessPieces.KING:
                    return kingWhiteImage;
            }
            break;
        case PlayerColors.BLACK:
            switch (figure) {
                case ChessPieces.PAWN:
                    return pawnBlackImage;
                case ChessPieces.KNIGHT:
                    return knightBlackImage;
                case ChessPieces.BISHOP:
                    return bishopBlackImage;
                case ChessPieces.ROOK:
                    return rookBlackImage;
                case ChessPieces.QUEEN:
                    return queenBlackImage;
                case ChessPieces.KING:
                    return kingBlackImage;
            }
    }

    return null;
}

interface AppGameBoardTableCellProps {
    innerRef?: React.RefObject<HTMLTableCellElement>
    row: number;
    column: number;
    figure?: ChessPieces;
    color?: PlayerColors;
    highlighted?: boolean;
    selected?: boolean;
    onCellClick: (cell: Coordinates) => void;
    onDragStart: (e: SyntheticEvent) => void;
}

class AppGameBoardTableCellClass extends React.Component<AppGameBoardTableCellProps> {
    public render(): React.ReactNode {
        const {
            figure,
            color,
            highlighted,
            selected,
            onDragStart,
            innerRef,
        } = this.props;
        const figureImage = getFigureImage(figure, color);
        const coordsDataAttributes = this.getDataCoorAttributeValue();

        return (
            <AppPageStyledGameBoardCell
                hasLightBackground={this.hasLightBackground()}
                coordBefore={coordsDataAttributes.before}
                coordAfter={coordsDataAttributes.after}
                highlighted={highlighted}
                selected={selected}
                onClick={this.onCellClick}
                ref={innerRef}
            >
                {
                    color && figure && (
                        <img
                            src={figureImage}
                            alt={`${color} ${figure}`}
                            draggable={false}
                            onMouseDown={onDragStart}
                        />
                    )
                }
            </AppPageStyledGameBoardCell>
        );
    }
    private hasLightBackground() {
        const {
            row,
            column,
        } = this.props;
        const rp = row % 2 === 0;
        const cp = column % 2 === 0

        if (rp){
            return cp;
        } else {
            return !cp;
        }
    }
    private getDataCoorAttributeValue(): {before: string; after: string;} {
        const {
            column,
            row,
        } = this.props;
        const result = {
            before: '',
            after: '',
        };

        if (row === 0) {
            result.before = converNumberToAlphabetLetter(column + 1);
        }

        if (column === 0) {
            result.after = String(8 - row);
        }

        return result;
    }
    @boundMethod
    private onCellClick(): void {
        const {
            onCellClick,
            column,
            row,
        } = this.props;

        onCellClick({x: column, y: row});
    }
}

export const AppGameBoardTableCell = React.forwardRef((props: AppGameBoardTableCellProps, ref: Ref<HTMLTableCellElement>) => (
    <AppGameBoardTableCellClass
        {...props}
        innerRef={ref as React.RefObject<HTMLTableCellElement>}
    />
));
