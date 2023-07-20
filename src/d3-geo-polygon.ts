declare module 'd3-geo-polygon' {
    type ArcPoint = [number, number];
    type ArcPoint2 = [ArcPoint, ArcPoint];
    export function geoIntersectArc(a: ArcPoint2, b: ArcPoint2): ArcPoint;

    /* complex.js */
    export function geoComplexLogRaw(geoProjection: GeoRawProjection = DEFAULT_PROJECTION_RAW): GeoRawProjection;
    export function geoComplexLog(planarProjection: GeoRawProjection, cutoffLatitude: number): GeoProjection;
}
