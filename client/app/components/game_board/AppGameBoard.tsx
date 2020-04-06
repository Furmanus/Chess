import * as React from 'react';
import {GameDataWithPlayerNames} from '../../../../common/interfaces/game_interfaces';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import {AppFullPageContainer} from '../../../common/styled/AppFullSizeContainer';
import {boundMethod} from 'autobind-decorator';
import {
    getCoordinatesFromString, highlightFigure,
    loadModel,
    loadModels,
    loadTexture, removeFigureHighlight,
    translateBoardCoordsToScenePosition
} from '../../game/utils';
import {theme} from '../../../common/theme/theme';
import {AppStyledLoader} from '../../../common/styled/AppStyledLoader';
import {Object3D} from 'three';

interface AppGameBoardProps {
    gameData: GameDataWithPlayerNames;
}
interface AppGameBoardState {
    isLoadingAssets: boolean;
    areAssetsLoaded: boolean;
}

export class AppGameBoard extends React.PureComponent<AppGameBoardProps, AppGameBoardState> {
    private element = React.createRef<HTMLDivElement>();
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private sceneTexture: THREE.Texture;
    private boardModel: THREE.Object3D;
    private figureModels: Array<THREE.Object3D>;
    private orbitControls: OrbitControls;
    private trackballControlls: TrackballControls;
    private mouse: THREE.Vector2;
    private raycaster: THREE.Raycaster;
    private currentlyHighlightedObject: THREE.Object3D;
    private isMouseClicked: boolean;

    public state = {
        isLoadingAssets: false,
        areAssetsLoaded: false,
    };

    public render(): React.ReactNode {
        const {
            isLoadingAssets,
        } = this.state;

        return (
            <React.Fragment>
                {
                    isLoadingAssets ?
                        <AppStyledLoader
                            type="RevolvingDot"
                            color={theme.color.background.darkblue}
                            width={150}
                            height={150}
                        /> :
                        <AppFullPageContainer ref={this.element}/>
                }
            </React.Fragment>
        );
    }
    public async componentDidMount(): Promise<void> {
        await this.loadResources();

        this.initialize();
    }
    public componentWillUnmount(): void {
        this.detachEvents();
    }
    private initialize(): void {
        const {
            current: container,
        } = this.element;
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.currentlyHighlightedObject = null;

        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0xF2F4F7, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.element.current.appendChild(this.renderer.domElement);

        this.createSceneObjects();
        this.attachEvents();

        this.initializeScene();
        this.renderScene();
    }
    private attachEvents(): void {
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('mousemove', this.onMouseMove);
    }
    private detachEvents(): void {
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('mousemove', this.onMouseMove);
    }
    @boundMethod
    private onWindowResize(): void {
        const currentWidth = this.element.current.clientWidth;
        const currentHeight = this.element.current.clientHeight;

        this.camera.updateProjectionMatrix();
        this.camera.aspect = currentWidth / currentHeight;
        this.renderer.setSize(currentWidth, currentHeight);
    }
    @boundMethod
    private onMouseMove(e: MouseEvent): void {
        const canvasBounds = (this.renderer.getContext().canvas as HTMLCanvasElement).getBoundingClientRect();

        this.mouse.x = ((e.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
        this.mouse.y = -((e.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
    }
    @boundMethod
    private onMouseDown(e: MouseEvent): void {
        this.isMouseClicked = true;
    }
    @boundMethod
    private onMouseUp(e: MouseEvent): void {
        this.isMouseClicked = false;
    }
    private createSceneObjects(): void {
        this.setCamera();
        this.addLights();
        this.setObjects();
    }
    private async loadResources(): Promise<void> {
        this.setState({
            isLoadingAssets: true,
        });

        await Promise.all([this.loadBoard(), this.loadTexture(), this.loadBoardModels()]);

        this.setState({
            isLoadingAssets: false,
        });
    }
    private addLights(): void {
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.45);
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.15);
        directionalLight.position.copy(new THREE.Vector3(0, 0, 100));
        directionalLight.castShadow = true;

        this.scene.add(ambientLight);
        this.scene.add(directionalLight);
    }
    private setCamera(): void {
        this.camera.position.set(0, -20, 30);
        this.camera.lookAt(0, 0, 0);
    }
    private initializeScene(): void {
        this.scene.background = this.sceneTexture;

        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);

        this.trackballControlls = new TrackballControls(this.camera, this.renderer.domElement);
        this.trackballControlls.minDistance = 10;
        this.trackballControlls.maxDistance = 100;
    }
    private async loadBoard(): Promise<void> {
        try {
            this.boardModel = await loadModel('/assets/board/board.obj', '/assets/board/board.mtl');
        } catch(e) {
            // TODO better error notification
            console.error(e);
        }
    }
    private async loadTexture(): Promise<void> {
        try {
            this.sceneTexture = await loadTexture('/assets/sky.jpg');
        } catch(e) {
            // TODO better error notification
            console.error(e);
        }
    }
    private async loadBoardModels(): Promise<void> {
        const models = await loadModels();

        this.figureModels = models;
    }
    private setObjects(): void {
        const [
            whitePawn,
            blackPawn,
            whiteKnight,
            blackKnight,
            whiteRook,
            blackRook,
            whiteBishop,
            blackBishop,
            whiteKing,
            blackKing,
            whiteQueen,
            blackQueen,
        ] = this.figureModels;
        const figureAndColorToObjectMap = {
            white: {
                pawn: whitePawn,
                knight: whiteKnight,
                rook: whiteRook,
                bishop: whiteBishop,
                queen: whiteQueen,
                king: whiteKing,
            },
            black: {
                pawn: blackPawn,
                knight: blackKnight,
                rook: blackRook,
                bishop: blackBishop,
                queen: blackQueen,
                king: blackKing,
            }
        };
        const {
            game_data,
        } = this.props.gameData;

        Object.keys(game_data).forEach((coord) => {
            const figureData = game_data[coord];
            const figure = figureAndColorToObjectMap[figureData.color][figureData.type] as THREE.Mesh;
            const coords = getCoordinatesFromString(coord);
            const clonedFigure = figure.clone(false);
            let boardCoords;

            clonedFigure.material = (figure.material as THREE.Material).clone();

            clonedFigure.userData.center = new THREE.Box3().setFromObject(clonedFigure).getCenter(new THREE.Vector3());
            clonedFigure.userData.name = `${figureData.color} ${figureData.type}`;
            clonedFigure.userData.coords = coord;

            boardCoords = translateBoardCoordsToScenePosition(clonedFigure, coords);
            this.setFigurePosition(clonedFigure, boardCoords.x, boardCoords.y);
            clonedFigure.position.set(boardCoords.x, boardCoords.y, 0);

            this.scene.add(clonedFigure);
        });

        this.boardModel.position.set(0, 0, 0);
        this.scene.add(this.boardModel);
    }
    private setFigurePosition(figure: THREE.Object3D, x: number, y: number): void {
        const scenePosition = translateBoardCoordsToScenePosition(figure, {x, y});

        figure.position.set(scenePosition.x, scenePosition.y, 0);
    }
    private calculateMouseMoveIntersections(): void {
        const intersects = this.getMouseIntersectedObjects();
        const {
            currentlyHighlightedObject,
        } = this;

        if (intersects.length) {
            const intersected = intersects[0].object;

            if (intersected !== this.currentlyHighlightedObject) {
                if (currentlyHighlightedObject) {
                    removeFigureHighlight(currentlyHighlightedObject);
                }
                if (!intersected.userData.name) {
                    return;
                }

                this.currentlyHighlightedObject = intersected;

                highlightFigure(intersected);
            }
        } else {
            if (currentlyHighlightedObject) {
                removeFigureHighlight(currentlyHighlightedObject);
            }

            this.currentlyHighlightedObject = null;
        }
    }
    private getMouseIntersectedObjects(): THREE.Intersection[] {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        return this.raycaster.intersectObjects(this.scene.children);
    }
    @boundMethod
    private renderScene(): void {
        this.orbitControls.update();
        this.trackballControlls.update();
        this.scene.children.forEach((obj: Object3D) => {
            obj.updateMatrixWorld();
        });
        this.calculateMouseMoveIntersections();
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.renderScene);
    }
}
