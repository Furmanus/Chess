import {GAME_BOARD_CELL_SIZE_HEIGHT, GAME_BOARD_CELL_SIZE_WIDTH} from './constants';
import * as THREE from 'three';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import MaterialCreator = MTLLoader.MaterialCreator;
import {Object3D} from 'three';
import {Coordinates} from '../../../common/interfaces/game_interfaces';

export function getCoordinatesFromString(coord: string): Coordinates {
    const splittedString = coord.split('x');

    return {
        x: Number(splittedString[0]),
        y: Number(splittedString[1]),
    }
}
export function translateBoardCoordsToScenePosition(figure: Object3D, coords: Coordinates): Coordinates {
    const pointZeroX = figure.position.x - figure.userData.center.x - 7 / 2 * GAME_BOARD_CELL_SIZE_WIDTH;
    const pointZeroY = figure.position.y - figure.userData.center.y - 7 / 2 * GAME_BOARD_CELL_SIZE_HEIGHT;

    return {
        x: pointZeroX + coords.x * GAME_BOARD_CELL_SIZE_WIDTH,
        y: pointZeroY + coords.y * GAME_BOARD_CELL_SIZE_HEIGHT,
    };
}
export function loadModel(url: string, materialUrl?: string): Promise<THREE.Object3D> {
    return new Promise<THREE.Object3D>((resolve, reject) => {
        if (materialUrl) {
            new MTLLoader().load(materialUrl, (parsedMaterial: MaterialCreator) => {
                const objectLoader = new OBJLoader();

                objectLoader.setMaterials(parsedMaterial);
                objectLoader.load(url, (model) => {
                    resolve(model.children[0]);
                }, undefined, (err) => {
                    reject(err);
                });
            }, undefined, (err) => {
                reject(err);
            });
        } else {
            new OBJLoader().load(url, (model) => {
                resolve(model.children[0]);
            }, undefined, (err) => {
                reject(err);
            });
        }
    });
}
export function loadModels() {
    return Promise.all([
        loadModel('/assets/pawn/pawn_white.obj', '/assets/pawn/pawn_white.mtl'),
        loadModel('/assets/pawn/pawn_black.obj', '/assets/pawn/pawn_black.mtl'),
        loadModel('/assets/knight/knight_white.obj', '/assets/knight/knight_white.mtl'),
        loadModel('/assets/knight/knight_black.obj', '/assets/knight/knight_black.mtl'),
        loadModel('/assets/rook/rook_white.obj', '/assets/rook/rook_white.mtl'),
        loadModel('/assets/rook/rook_black.obj', '/assets/rook/rook_black.mtl'),
        loadModel('/assets/bishop/bishop_white.obj', '/assets/bishop/bishop_white.mtl'),
        loadModel('/assets/bishop/bishop_black.obj', '/assets/bishop/bishop_black.mtl'),
        loadModel('/assets/king/king_white.obj', '/assets/king/king_white.mtl'),
        loadModel('/assets/king/king_black.obj', '/assets/king/king_black.mtl'),
        loadModel('/assets/queen/queen_white.obj', '/assets/queen/queen_white.mtl'),
        loadModel('/assets/queen/queen_black.obj', '/assets/queen/queen_black.mtl'),
    ]);
}
export function loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise<THREE.Texture>((resolve, reject) => {
        new THREE.TextureLoader().load(url, (texture: THREE.Texture) => {
            resolve(texture);
        }, undefined, (e) => {
            reject(e);
        });
    });
}
export function highlightFigure(figure: THREE.Object3D): void {
    // TODO get rid of those ts-ignores
    // @ts-ignore
    figure.userData.currentColor = figure.material.emissive.getHex();
    // @ts-ignore
    figure.material.emissive.setHex(0x0013ff);
}
export function removeFigureHighlight(figure: Object3D): void {
    // @ts-ignore
    figure.material.emissive.setHex(figure.userData.currentColor);
}
