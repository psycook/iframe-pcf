import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class IFrameComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _iframe: HTMLIFrameElement;
    private _container: HTMLDivElement;
    private _context: ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;
    private _initialised: boolean = false;

    private _src: string;

    constructor()
    {
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this._container = container;
        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
        this._context.mode.trackContainerResize(true);
        this._initialised = false;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
        if(!this._initialised)
        {
            this.renderIFrame();
            this._initialised = true;
        }

        if(this._context.parameters.src.raw !== this._src) 
        {
            this._src = this._context.parameters.src.raw || "";
            this._iframe.src = this._context.parameters.src.raw || "";
        }
        this._iframe.width = `${this._context.mode.allocatedWidth}px`;
        this._iframe.height = `${this._context.mode.allocatedHeight}px`;
    }

    private renderIFrame()
    {
        this._iframe = document.createElement("iframe");
        this._iframe.width = `100%`;
        this._iframe.height = `100%`;
        this._iframe.style.border = "none";
        this._container.appendChild(this._iframe);
    }

    public getOutputs(): IOutputs
    {
        return {};
    }

    public destroy(): void
    {
    }
}
