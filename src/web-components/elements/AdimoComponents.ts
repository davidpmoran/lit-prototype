export class AdimoLabel {
    id: string;
    onClick: string;
    style: string;
    text: string;
    index: string;
}


export class AdimoButton {
    id: string;
    onClick: string;
    style: string;
    text: string;
    index: string;
}

export class AdimoComponent {
    adimoButtons: AdimoButton[] | null;
    adimoLabels: AdimoLabel[] | null;
    adimoComponents: AdimoComponent[] | null;
}