# Planet STAC Extension

- **Title:** Planet Labs
- **Identifier:** <https://planetlabs.github.io/stac-extension/{{version}}/schema.json> (see the [releases page](https://github.com/planetlabs/stac-extension/releases) for a list of published versions)
- **Field Name Prefix:** pl
- **Scope:** Item
- **Extension [Maturity Classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity):** Proposal
- **Owner**: @cholmes @tschaub @m-mohr

This document describes the Planet Labs Extension to the [SpatioTemporal Asset Catalog](https://github.com/radiantearth/stac-spec) (STAC) specification. The extension defines fields specific to the products offered by Planet Labs.

The fields defined here are mostly mapped directly from the Item Properties defined in the [Planet API](https://developers.planet.com/docs/apis/data/items-assets/). If possible the fields are mapped to commonly used fields in STAC, including a variety of extensions (e.g. eo, view). See [Field mapping and scope](mapping.md) for a table that maps between Planet Item Properties and STAC fields. Sometimes fields don't map 1:1 and need a slight conversion, which will be mentioned in the description for each field here. It also gives an overview over the fields that are available for the individual item types.

**The following item types are covered by this extension:**

- PlanetScope:
  - [`PSOrthoTile`](https://developers.planet.com/docs/data/psorthotile/)
  - [`PSScene`](https://developers.planet.com/docs/data/psscene/)
- RapidEye:
  - [`REOrthoTile`](https://developers.planet.com/docs/data/reorthotile/)
  - [`REScene`](https://developers.planet.com/docs/data/rescene/)
- SkySat:
  - [`SkySatCollect`](https://developers.planet.com/docs/data/skysatcollect/)
  - [`SkySatScene`](https://developers.planet.com/docs/data/skysatscene/)
  - [`SkySatVideo`](https://developers.planet.com/docs/data/skysatvideo/)
- Landsat
  - [`Landsat8L1G`](https://developers.planet.com/docs/data/landsat-8/)
- MODIS
  - [`MOD09GA`, `MYD09GA`, `MOD09GQ`, `MYD09GQ`](https://developers.planet.com/apis/orders/product-bundles-reference/)
- Sentinel
  - [`Sentinel1`](https://developers.planet.com/apis/orders/product-bundles-reference/)
  - [`Sentinel2L1C`](https://developers.planet.com/docs/data/sentinel2l1c/)

The deprecated item types `PSScene3Band` and `PSScene4Band` are not supported and will not be validated.

**Important links for this extension:**

- Examples:
  - [Browse in STAC Browser](https://radiantearth.github.io/stac-browser/#/external/raw.githubusercontent.com/planetlabs/stac-extension/main/examples/catalog.json)
  - PlanetScope:
    - [PSScene Item](examples/items/psscene.json)
    - [PSOrthoTile Item](examples/items/psorthotile.json)
  - RapidEye:
    - [REOrthoTile Item](examples/items/psorthotile.json)
    - [REScene Item](examples/items/rescene.json)
  - SkySat:
    - [SkySatCollect Item](examples/items/skysatcollect.json)
    - [SkySatScene Item](examples/items/skysatscene.json)
- [JSON Schema](./schema.json)

## Item Properties Fields

The fields in the tables below can be used in these parts of STAC documents:
- [ ] Catalogs
- [ ] Collections
- [x] Item Properties (including Summaries in Collections)
- [ ] Assets (for both Collections and Items, including Item Asset Definitions in Collections)
- [ ] Links

### Planet-specific

| Field Name              | Type    | Description |
| ----------------------- | ------- | ----------- |
| pl:black_fill           | number  | The percentage of the item containing black fill in the range 0 - 100 (inclusive). |
| pl:clear_percent        | number  | Percent of clear values in dataset. Percentages must be provided in the range 0 - 100 (inclusive). |
| pl:grid_cell            | string  | The grid cell identifier of the gridded item. |
| pl:ground_control       | boolean | Positional accuracy of the item. If the item has uncertain positional accuracy, this value will be `false`. |
| pl:ground_control_ratio | number  | Ratio of individual scenes that are successfully rectified, in the range 0 - 1 (inclusive). Only applies to `SkySatCollect`. |
| pl:item_type            | string  | **REQUIRED**. Name of the item type. Allowed values: see below |
| pl:pixel_resolution     | number  | The spatial resolution, in meters. (This is meant to be deprecated in favor of [`spatial_resolution`](https://github.com/radiantearth/stac-spec/issues/1196).) |
| pl:publishing_stage     | string  | Stage of [publishing for an item](https://developers.planet.com/docs/apis/data/items-assets/#item-publishing-lifecycle). Allowed values: `preview`, `standard`, `finalized`. |
| pl:quality_category     | string  | Metric for image quality. Allowed values: `standard`, `test`. |
| pl:strip_id             | string  | The unique identifier of the image stripe that the item came from. |

**Additional REQUIRED fields per `pl:item_type`:**

| Field Name              | PSOrthoTile | PSScene | REOrthoTile | REScene | SkySatCollect | SkySatScene | SkySatVideo | Landsat8L1G | M(O/Y)D09G(A/Q) | Sentinel1 | Sentinel2L1C |
| ----------------------- | ----------- | ------- | ----------- | ------- | ------------- | ----------- | ----------- | ----------- | --------------- | --------- | ------------ |
| pl:black_fill           | ✓ |   | ✓ | ✓ |   |   |   |   | ✓ | ✓ | ✓ |
| pl:clear_percent        | ✓ | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |
| pl:grid_cell            | ✓ |   | ✓ |   |   |   |   |   |   |   |   |
| pl:ground_control       | ✓ | ✓ | ✓ |   |   | ✓ |   |   |   |   |   |
| pl:ground_control_ratio |   |   |   |   | ✓ |   |   |   |   |   |   |
| pl:pixel_resolution     | ✓ | ✓ | ✓ |   | ✓ | ✓ |   | ✓ | ✓ |   | ✓ |
| pl:publishing_stage     | ✓ | ✓ |   |   | ✓ | ✓ | ✓ |   |   |   |   |
| pl:quality_category     | ✓ | ✓ |   |   | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| pl:strip_id             | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |   |   |   |   |

#### pl:item_type

The following values exist for the Planet Labs satellites:

- PlanetScope:
  - [`PSOrthoTile`](https://developers.planet.com/docs/data/psorthotile/)
  - [`PSScene`](https://developers.planet.com/docs/data/psscene/)
- RapidEye:
  - [`REOrthoTile`](https://developers.planet.com/docs/data/reorthotile/)
  - [`REScene`](https://developers.planet.com/docs/data/rescene/)
- SkySat:
  - [`SkySatCollect`](https://developers.planet.com/docs/data/skysatcollect/)
  - [`SkySatScene`](https://developers.planet.com/docs/data/skysatscene/)
  - [`SkySatVideo`](https://developers.planet.com/docs/data/skysatvideo/)

The following item types don't come from Planet satellites, but have some support in Planet APIs:

- [`Landsat8L1G`](https://developers.planet.com/docs/data/landsat-8/)
- [`MOD09GA`, `MYD09GA`, `MOD09GQ`, `MYD09GQ`](https://developers.planet.com/apis/orders/product-bundles-reference/)
- [`Sentinel1`](https://developers.planet.com/apis/orders/product-bundles-reference/)
- [`Sentinel2L1C`](https://developers.planet.com/docs/data/sentinel2l1c/)

### Other Extensions and Specifications

This extension uses and requires additional fields from other specifications/extensions.

The following specifications are relevant here:
- [STAC Common Metadata](https://github.com/radiantearth/stac-spec/blob/master/item-spec/common-metadata.md)
- [STAC EO Extension](https://github.com/stac-extensions/eo) (v1.1.0 or later)
- [STAC Viewing Angles Extension](https://github.com/stac-extensions/view) (v1.0.0 or later)

| Field Name         | Type       | Description |
| ------------------ | ---------- | ----------- |
| constellation      | string     | **REQUIRED**. As defined in common metadata, but restricted to one of the constellations below. |
| platform           | string     | **REQUIRED.** Globally unique satellite identifier as defined in common metadata, but restricted to the patterns listed below. |
| instruments        | \[string\] | The instrument identifier as defined in common metadata, but restricted to those listed below. |
| datetime           | string     | **REQUIRED**. The acquisition time As defined in common metadata and STAC. |
| gsd                | number     | Ground sample distance as defined in common metadata. |
| eo:cloud_cover     | number     | Cloud cover as defined in the EO extension. |
| eo:snow_cover      | number     | Snow/ice cover as defined in the EO extension. |
| view:azimuth       | number     | Time of publication as defined in the Viewing Angles extension. |
| view:off_nadir     | number     | **REQUIRED**. The satellite's across-track, off-nadir viewing angle. |
| view:sun_azimuth   | number     | **REQUIRED**. Time of publication as defined in the Viewing Angles extension. |
| view:sun_elevation | number     | **REQUIRED**. Time of publication as defined in the Viewing Angles extension. |

**Additional REQUIRED fields per `pl:item_type`:**

| Field Name     | PSOrthoTile | PSScene | REOrthoTile | REScene | SkySatCollect | SkySatScene | SkySatVideo | Landsat8L1G | M(O/Y)D09G(A/Q) | Sentinel1 | Sentinel2L1C |
| -------------- | ----------- | ------- | ----------- | ------- | ------------- | ----------- | ----------- | ----------- | --------------- | --------- | ------------ |
| instruments               | ✓ | ✓ |   |   |   |   |   | ✓ | ✓ |   | ✓ |
| gsd                       | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |   | ✓ | ✓ | ✓ | ✓ |
| eo:cloud_cover            | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |   | ✓ | ✓ |   | ✓ |
| eo:snow_cover             |   | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |
| view:azimuth              | ✓ | ✓ |   |   | ✓ | ✓ | ✓ |   |   |   |   |
| view:sun_azimuth          | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| view:sun_elevation        | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| sar:frequency_band        |   |   |   |   |   |   |   |   |   | ✓ |   |
| sar:instrument_mode       |   |   |   |   |   |   |   |   |   | ✓ |   |
| sar:observation_direction |   |   |   |   |   |   |   |   |   | ✓ |   |
| sar:polarizations         |   |   |   |   |   |   |   |   |   | ✓ |   |
| sar:product_type          |   |   |   |   |   |   |   |   |   | ✓ |   |

#### constellation

The following values exist for the Planet Labs satellites:

- PlanetScope: `planetscope`
- RapidEye: `rapideye`
- SkySat: `skysat`

For non Planet Satellites:

- Landsat8/MODIS: `usgs`
- Sentinel: `esa`

#### platform

The following patterns are allowed for the Planet Labs satellites:

- PlanetScope: `[0-9a-f]{2,}` (e.g. `0c08`, `227c`, etc.)
- RapidEye: `RapidEye-\d+` (e.g. `RapidEye-1`, `RapidEye-2`, etc.)
- SkySat: `SSC\\d+` (e.g. `SSC1`, `SSC19`, etc.)

For non Planet Satellites:

- Landsat8: `Landsat8`
- MODIS: `Terra` or `Aqua`
- Sentinel: `Sentinel\w+`

#### instruments

The following values exist for the Planet Labs satellites:

- PlanetScope: `PS2` (Dove Classic), `PS2.SD` (Dove-R), `PSB.SD` (SuperDove)
- RapidEye: n/a
- SkySat: n/a
  
For non Planet Satellites:

- Landsat8: `OLI_TIRS`
- MODIS: `MODIS`
- Sentinel1: n/a
- Sentinel2: `MSI`

Please note that the `instruments` field is always specified as an array.

#### view:off_nadir

This field is basically the `view_angle` field in the Planet API. The values are equal for SkySat and Planetscope, but for RapidEye they can also be negative (positive numbers denote east, negative numbers denote west). So the `view_angle` as defined by the Planet API maps 1:1 to `view:off_nadir`, but **for RapidEye you have to use the absolute value of `view_angle`**.

## Asset Fields

### Planet-specific

The fields in the tables below can be used in these parts of STAC documents:
- [ ] Catalogs
- [ ] Collections
- [ ] Item Properties (incl. Summaries in Collections)
- [x] Assets (for both Collections and Items, incl. Item Asset Definitions in Collections)
- [ ] Links

| Field Name     | Type   | Description |
| -------------- | ------ | ----------- |
| pl:asset_type  | string | The type of asset. |
| pl:bundle_type | string | The type of bundle the asset belongs to. |

### pl:asset_type

These asset types are specific to Planet and may lead to additional requirements in the future.

The allowed asset types can be found here per item type:

- PlanetScope:
  - [`PSOrthoTile`](https://developers.planet.com/docs/data/psorthotile/#available-asset-types)
  - [`PSScene`](https://developers.planet.com/docs/data/psscene/#available-asset-types)
- RapidEye:
  - [`REOrthoTile`](https://developers.planet.com/docs/data/reorthotile/#available-asset-types)
  - [`REScene`](https://developers.planet.com/docs/data/rescene/#available-asset-types)
- SkySat:
  - [`SkySatCollect`](https://developers.planet.com/docs/data/skysatcollect/#available-asset-types)
  - [`SkySatScene`](https://developers.planet.com/docs/data/skysatscene/#available-asset-types)
  - [`SkySatVideo`](https://developers.planet.com/docs/data/skysatvideo/#available-asset-types)
- Landsat, Sentinel, MODIS
  - These asset types aren't documented as much on the Planet side, but can be explored [here](https://developers.planet.com/apis/orders/product-bundles-reference/) or in the schema

The [JSON Schema](./schema.json) also provides a full list of all allowed values.

### Other Extensions and Specifications

Additionally, this extension uses and partially requires additional fields from other specifications/ extensions. The following specifications are relevant here:
- [STAC Common Metadata](https://github.com/radiantearth/stac-spec/blob/master/item-spec/common-metadata.md)
- [STAC Projection Extension](https://github.com/stac-extensions/projection) (v1.1.0 or later)
- [STAC Raster Extension](https://github.com/stac-extensions/raster) (v1.0.0 or later)
- [STAC Timestamps Extension](https://github.com/stac-extensions/timestamps) (v1.1.0 or later)

For Sentinel1
- [STAC SAR Extension](https://github.com/stac-extensions/sar) (v1.0.0 or later)

| Field Name   | Type        | Description |
| ------------ | ----------- | ----------- |
| published    | string      | **REQUIRED**. Time of data publication as defined in the STAC Timestamps Extension. |
| updated      | string      | **REQUIRED**. Time of most recent data update as defined in STAC Common Metadata. |
| proj:espg    | integer     | The EPSG code as defined in the Projection extension. |
| proj:shape   | \[integer\] | The number of rows and cols in the image as defined in the Projection extension. |
| raster:bands | \[[Raster Band Object](https://github.com/stac-extensions/raster#raster-band-object)] | The bands of the file with a `spatial_resolution`. |

These fields should only be provided for actual data files (e.g. COG), not for metadata (e.g. XML). Currently, the JSON Schema does not fully validate these fields.

The fields defined in the [Projection extension](https://github.com/stac-extensions/projection#fields) can either be used at the Asset-level or go into the Item Properties. To avoid ambiguities it is recommended to have them at the Asset-level, but both is allowed.

**Additional REQUIRED fields per `pl:item_type`:**

| Field Name                           | PSOrthoTile | PSScene | REOrthoTile | REScene | SkySatCollect | SkySatScene | SkySatVideo | Landsat8L1G | M(O/Y)D09G(A/Q) | Sentinel1 | Sentinel2L1C |
| ------------------------------------ | ----------- | ------- | ----------- | ------- | ------------- | ----------- | ----------- | ----------- | --------------- | --------- | ------------ |
| proj:epsg                            | ✓ |   | ✓ |   |   |   |   | ✓ |   | ✓ | ✓ |
| proj.shape                           | ✓ | ✓ | ✓ | ✓ |   |   |   | ✓ |   | ✓ | ✓ |
| raster:bands\[\*].spatial_resolution | ✓ | ✓ | ✓ |   | ✓ | ✓ |   | ✓ |   |   | ✓ |

*Note: These requirements are not enforced in the JSON Schema yet.*

## Providers

For the `providers` field in a STAC Collection (or in the STAC Item Properties), it is recommended to provide the following details for Planet:

- Name: `Planet Labs PBC`
- Roles: at least `producer` and `licensor`
