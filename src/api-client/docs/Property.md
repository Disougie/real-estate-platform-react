# Property


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**price** | **number** |  | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**ownerId** | **number** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**features** | [**Features**](Features.md) |  | [optional] [default to undefined]
**mapsLocation** | [**GeoJsonPoint**](GeoJsonPoint.md) |  | [optional] [default to undefined]
**location** | [**Location**](Location.md) |  | [optional] [default to undefined]
**images** | [**Array&lt;Image&gt;**](Image.md) |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**review** | [**Review**](Review.md) |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**deletedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { Property } from './api';

const instance: Property = {
    id,
    title,
    price,
    type,
    ownerId,
    status,
    features,
    mapsLocation,
    location,
    images,
    description,
    review,
    createdAt,
    deletedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
