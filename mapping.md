# Field mapping and scope

The following table maps the Planet Item Properties as defined for their individual products to the
STAC Item properties (if not stated otherwise) and lists for which `pl:item_type` they apply:

| STAC | Planet | PSOrthoThile | PSScene | REOrthoTile | REScene | SkySatCollect | SkySatScene | SkySatVideo | Landsat8L1G | MOD09GA | MOD09GQ | MYD09GA | MYD09GQ | Sentinel1 | Sentinel2L1C |
| ---- | ------ | ------------ | ------- | ----------- | ------- | ------------- | ----------- | ----------- | ----------- | ------- | ------- | ------- | ------- | --------- | ------------ |
| assets (top-level, different structure) | **_permissions**           | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| geometry (top-level)                    | **geometry**               | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| id (top-level)                          | **id**                     | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| datetime                                | **acquired**               | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| -                                       | anomalous_pixels           | ✓ | ✓ | ✓ | ✓ |   |   |   | ✓ | ✓ | ✓ | ✓ |   | ✓ | ✓ |
| *pl:black_fill*                         | black_fill                 | ✓ |   | ✓ | ✓ |   |   |   |   | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| -                                       | camera_id                  |   |   |   |   |   | ✓ | ✓ |   |   |   |   |   |   |   |
| collection (top-level)                  | catalog_id                 |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |   |   |
| -                                       | clear_confidence_percent   | ✓ | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   | 
| *pl:clear_percent*                      | clear_percent              | ✓ | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |
| eo:cloud_cover                          | cloud_cover                | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |   | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| -                                       | cloud_percent              | ✓ | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |
| proj.shape\[1] (assets)                 | columns                    | ✓ |   | ✓ | ✓ |   |   |   | ✓ |   |   |   |   | ✓ | ✓ |
| proj:epsg (assets)                      | epsg_code                  | ✓ |   | ✓ |   |   |   |   | ✓ |   |   |   |   | ✓ | ✓ |
| *pl:grid_cell*                          | grid_cell                  | ✓ |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |
| *pl:ground_control*                     | ground_control             | ✓ | ✓ | ✓ |   |   | ✓ |   |   |   |   |   |   |   |   | 
| *pl:ground_control_ratio*               | ground_control_ratio       |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| gsd                                     | **gsd**                    | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |   | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |   
| -                                       | heavy_haze_percent         | ✓ | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |
| instruments\[0]                         | instrument                 | ✓ | ✓ |   |   |   |   |   | ✓ | ✓ | ✓ | ✓ | ✓ |   | ✓ |
| *pl:item_type*                          | **item_type**              | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| -                                       | light_haze_percent         | ✓ | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |
| -                                       | origin_x                   | ✓ |   | ✓ |   |   |   |   | ✓ |   |   |   |   |   | ✓ |
| -                                       | origin_y                   | ✓ |   | ✓ |   |   |   |   | ✓ |   |   |   |   |   | ✓ |
| pl:pixel_resolution (spatial_resolution) | pixel_resolution          | ✓ | ✓ | ✓ |   | ✓ | ✓ |   | ✓ | ✓ | ✓ | ✓ | ✓ |   | ✓ |
| constellation                           | **provider**               | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| published (assets)                      | **published**              | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| *pl:publishing_stage*                   | publishing_stage           | ✓ | ✓ |   |   | ✓ | ✓ | ✓ |   |   |   |   |   |   |   |
| *pl:quality_category*                   | quality_category           | ✓ | ✓ |   |   | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| proj.shape\[0] (assets)                 | rows                       | ✓ | ✓ | ✓ | ✓ |   |   |   | ✓ |   |   |   |   | ✓ | ✓ |
| view:azimuth                            | satellite_azimuth          | ✓ | ✓ |   |   | ✓ | ✓ | ✓ |   |   |   |   |   |   |   |
| platform                                | **satellite_id**           | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| -                                       | shadow_percent             |   | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |
| eo:snow_cover                           | snow_ice_percent           |   | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |
| *pl:strip_id*                           | strip_id                   | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |   |   |   |   |   |   |   |   
| view:sun_azimuth                        | **sun_azimuth**            | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| view:sun_elevation                      | **sun_elevation**          | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| updated (assets)                        | **updated**                | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| -                                       | usable_data                | ✓ |   | ✓ | ✓ |   |   |   | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| view:off_nadir (absolute value)         | **view_angle**             | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |   
| -                                       | visible_confidence_percent | ✓ | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |
| -                                       | visible_percent            | ✓ | ✓ |   |   | ✓ | ✓ |   |   |   |   |   |   |   |   |
