type SampleDataset<T, K=T> = T[] & {
    columns: (keyof K)[]
};

declare module '@observablehq/aapi' {
    export type AapiEntry = {
        date: Date,
        close: number,
    };
    export default function aapi(): AapiEntry[] & {
        columns: keyof AapiEntry
    };
}

declare module '@observablehq/alphabet' {
    export type AlphabetEntry = {
        letter: string,
        frequency: number,
    };
    export default function alphabet(): SampleDataset<
        AlphabetEntry,
        [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
    >;
}

declare module '@observablehq/cars' {
    export type ObservableCarOrigin = 
        | 'USA'
        | 'Europe'
        | 'Japan';

    export type ObservableCar = {
        Name: string,
        Miles_per_Gallon: number,
        Cylinders: number,
        Displacement: number,
        Horsepower: number,
        Weight_in_lbs: number,
        Acceleration: number,
        Year: Date,
        Origin: ObservableCarOrigin,
    };
    export default function cars(): ObservableCar[] & {
        columns: keyof ObservableCar
    };
}

declare module '@observablehq/d3' {
    export type ObservableD3Entry = {
        name: string
        children?: ObservableD3Entry[]
        size?: number
    };
    export default function(): ObservableD3Entry;
}

declare module '@observablehq/diamonds' {
    export type ObservableDiamondCut =
        | 'Ideal'
        | 'Premium'
        | 'Good'
        | 'Very Good'
        | 'Fair';
    export type ObservableDiamondColor =
        | 'D'
        | 'E'
        | 'F'
        | 'G'
        | 'H'
        | 'I'
        | 'J';
    export type ObservableDiamondClarity =
        | 'I1'
        | 'SI2'
        | 'SI1'
        | 'VS2'
        | 'VS1'
        | 'VVS2'
        | 'VVS1'
        | 'IF';
    export type ObservableDiamond = {
        carat: number;
        cut: ObservableDiamondCut
        color: ObservableDiamondColor;
        clarity: ObservableDiamondClarity;
        depth: number;
        table: number;
        price: number;
        x: number;
        y: number;
        z: number;
    };
    export default function(): ObservableDiamond[] & {
        columns: keyof ObservableDiamond
    };
    export default function(): SampleDataset<ObservableDiamond>;
}

declare module '@observablehq/dji' {
    export type ObservableDjiEntry = {
        date: Date,
        open: number,
        high: number,
        low: number,
        close: number,
        volume: number,
    };
    export default function(): SampleDataset<ObservableDjiEntry>;
}

declare module '@observablehq/flare' {
    export type IndividualWithChildren = {
        name: string;
        children?: IndividualWithChildren[];
        size: number;
    };

    export default function(): IndividualWithChildren;
}

declare module '@observablehq/iris' {
    export type ObservableIrisSpecies =
        | 'setosa'
        | 'versicolor'
        | 'virginica';
    export type ObservableIris = {
        sepalLength: number,
        sepalWidth: number,
        petalLength: number,
        petalWidth: number,
        species: ObservableIrisSpecies,
    };
    export default function(): SampleDataset<ObservableIris>;
}

export module '@observablehq/miserables' {
    export type ObservableMiserablesNode = {
        id: string;
        group: number;
    };
    export type ObservableMiserablesLink = {
        source: string;
        target: string;
        value: number;
    };
    export default function(): {
        nodes: ObservableMiserablesNode[];
        links: ObservableMiserablesLink[];
    };
}

declare module '@observablehq/mtcars' {
    export type ObservableMtCar = {
        name: string;
        mpg: number;
        cyl: number;
        disp: number;
        hp: number;
        drat: number;
        wt: number;
        qsec: number;
        vs: number;
        am: number;
        gear: number;
        carb: number;
    };
    export default function(): SampleDataset<ObservableMtCar>;
}

declare module '@observablehq/population' {
    export type ObservablePopulationEntry = {
        id: string;
        state: string;
        county: string;
        population: number;
    };

    export default function(): SampleDataset<ObservablePopulationEntry>;
}

declare module '@observablehq/unemployment' {
    export type ObservableUnemploymentEntry = {
        id: string,
        state: string,
        county: string,
        rate: number,
    };
    export default function(): SampleDataset<ObservableUnemploymentEntry>;
}
