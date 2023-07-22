declare module 'd3-geo-polygon' {
    import { GeoProjection, GeoRawProjection, geoAzimuthalEqualAreaRaw } from 'd3-geo';
    import { MultiPolygon, Polygon } from 'geojson';

    // base APIs
    export type Point2 = [number, number];
    export type Point3 = [number, number, number];

	export function geoClipPolygon(polygon: Polygon|MultiPolygon);

    export type SphericalArc = [Point2, Point2];
    export function geoIntersectArcs(a: SphericalArc, b: SphericalArc): Point2|undefined;


    // polygon projections
    export type PolyhedralFaceProjection = {
        face: Point2[],
        site: Point2,
        id: number,
        contains: GeoPolyhedralFaceFn,
        direction: number,
        project: GeoProjection,
        children: PolyhedralFaceProjection[],
    };
    export type GeoPolyhedralFaceFn = (lambda: number, phi: number) => PolyhedralFaceProjection;
    export function geoPolyhedral(tree: PolyhedralFaceProjection, edges: PolyhedralFaceProjection): GeoProjection;

    export type Octahedron = Point2[][];
    export type GeoForwardFn = (lambda: number, phi: number) => Point2;

    // Polyhedral butterfly projections
    export function geoPolyhedralButterfly(face: PolyhedralFaceProjection);

    // Polyhedral collignon projections
    export function geoPolyhedralCollignon(face: PolyhedralFaceProjection): GeoProjection;

    // Polyhedral waterman projections
    export function geoPolyhedralWaterman(face: PolyhedralFaceProjection): GeoProjection;

    // Polyhedral Voroni projections
    export type GeoVoroniProjection = GeoProjection & {
        parents: (_: any) => GeoVoroniProjection,
        polygons: (_: any) => GeoVoroniProjection,
        faceProjection: (_: any) => GeoVoroniProjection,
        faceFind: (_: any) => GeoVoroniProjection,
    };
    export function geoPolyhedralVoroni(face: PolyhedralFaceProjection): GeoVoroniProjection;

    // Dodecahedral projections (uses Voroni)
    export function geoDodecahedral(): GeoVoroniProjection;

    // Cox
    export function geoCox(): GeoProjection;
    export function geoCoxRaw(lambda: number, phi: number): Point2;
    
    // Tetrahedral lee
    export function geoTetrahedralLee(): GeoProjection;
    export function geoLeeRaw(): GeoProjection;

    // Gray Fuller
    export type GeoGrayFullerProjection = GeoPolyhedralFaceFn & {
        invert: (x: number, y: number) => GeoRawProjection,
    };
    export function geoGrayFullerRaw(): GeoGrayFullerProjection;

    // Airocean
    export function geoAirocean(): GeoProjection;

    // Icosahedral (uses Voroni)
    export function geoIcosahedral(): GeoVoroniProjection;

    // Imago
    export type GeoImagoProjection = GeoProjection & {
        shift: (number) => GeoProjection|number,
        k: (number) => GeoProjection|number,
    };
    export type GeoImagoBlockProjection = GeoProjection & {
        k: (number) => GeoProjection|number,
    };
    export type GeoImagoRawProjection = GeoForwardFn & {
        invert: (x: number, y: number) => Point2,
    };

    export function geoImago(): GeoImagoProjection;
    export function geoImagoBlock(): GeoImagoBlockProjection;
    export function geoImagoRaw(k: number): GeoImagoRawProjection;

    // Cubic (uses Voroni)
    export function geoCubic(): GeoVoroniProjection;
    
    // Cahill-Keyes
    export function geoCahillKeyes(): GeoProjection;
    export function geoCahillKeyesRaw(): GeoProjection;

    // Complex logs
    // export type GeoComplexLogProjection = GeoProjection & {
    //     planarProjectionRaw: (_: any) => GeoRawProjection,
    //     cutoffLatitude: (_: any) => number,
    // };
    export type GeoComplexLogRawProjection = GeoForwardFn & {
        invert: (x: number, y: number) => Point2,
    };

    export function geoComplexLog(): GeoProjection;
    export function geoComplexLogRaw(planarProjection = geoAzimuthalEqualAreaRaw, cutoffLatitude: number): GeoProjection;
}
