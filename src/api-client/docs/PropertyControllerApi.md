# PropertyControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addPropertyAd**](#addpropertyad) | **POST** /api/v1/properties | |
|[**changePropertyAd**](#changepropertyad) | **PATCH** /api/v1/properties/{id} | |
|[**deletePropertyAd**](#deletepropertyad) | **DELETE** /api/v1/properties/{id} | |
|[**getMyProperties**](#getmyproperties) | **GET** /api/v1/properties/my-properties | |
|[**getMyProperty**](#getmyproperty) | **GET** /api/v1/properties/my-property/{id} | |
|[**getProperties**](#getproperties) | **GET** /api/v1/properties | |
|[**getProperty**](#getproperty) | **GET** /api/v1/properties/{id} | |
|[**ratePropertyAd**](#ratepropertyad) | **POST** /api/v1/properties/rating/{id} | |
|[**searchByCoordinates**](#searchbycoordinates) | **GET** /api/v1/properties/search/coord | |
|[**searchByFilters**](#searchbyfilters) | **GET** /api/v1/properties/search/filter | |
|[**searchByText**](#searchbytext) | **GET** /api/v1/properties/search | |

# **addPropertyAd**
> PropertyAdCreationResponse addPropertyAd(propertyAdPostRequest)


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration,
    PropertyAdPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

let propertyAdPostRequest: PropertyAdPostRequest; //

const { status, data } = await apiInstance.addPropertyAd(
    propertyAdPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **propertyAdPostRequest** | **PropertyAdPostRequest**|  | |


### Return type

**PropertyAdCreationResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **changePropertyAd**
> object changePropertyAd(propertyPatchRequest)


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration,
    PropertyPatchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

let id: string; // (default to undefined)
let propertyPatchRequest: PropertyPatchRequest; //

const { status, data } = await apiInstance.changePropertyAd(
    id,
    propertyPatchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **propertyPatchRequest** | **PropertyPatchRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deletePropertyAd**
> object deletePropertyAd()


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deletePropertyAd(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMyProperties**
> Array<Property> getMyProperties()


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

const { status, data } = await apiInstance.getMyProperties();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Property>**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMyProperty**
> PropertyDetailedResponse getMyProperty()


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getMyProperty(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**PropertyDetailedResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProperties**
> PageResponsePropertyBriefResponse getProperties()


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 20)

const { status, data } = await apiInstance.getProperties(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 20|


### Return type

**PageResponsePropertyBriefResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProperty**
> PropertyDetailedResponse getProperty()


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getProperty(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**PropertyDetailedResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ratePropertyAd**
> object ratePropertyAd(reviewRequest)


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration,
    ReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

let id: string; // (default to undefined)
let reviewRequest: ReviewRequest; //

const { status, data } = await apiInstance.ratePropertyAd(
    id,
    reviewRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reviewRequest** | **ReviewRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchByCoordinates**
> Array<PropertyMapResponse> searchByCoordinates()


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

let lng: number; // (default to undefined)
let lat: number; // (default to undefined)
let maxDistance: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.searchByCoordinates(
    lng,
    lat,
    maxDistance
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lng** | [**number**] |  | defaults to undefined|
| **lat** | [**number**] |  | defaults to undefined|
| **maxDistance** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<PropertyMapResponse>**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchByFilters**
> PageResponsePropertyBriefResponse searchByFilters()


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

let type: 'RENT' | 'PURCHASE' | 'COMMERCIAL_RENT' | 'COMMERCIAL_PURCHASE' | 'STUDENT'; // (optional) (default to undefined)
let city: string; // (optional) (default to undefined)
let area: string; // (optional) (default to undefined)
let minRooms: number; // (optional) (default to undefined)
let maxRooms: number; // (optional) (default to undefined)
let minBaths: number; // (optional) (default to undefined)
let maxBaths: number; // (optional) (default to undefined)
let minPrice: number; // (optional) (default to undefined)
let maxPrice: number; // (optional) (default to undefined)
let minSize: number; // (optional) (default to undefined)
let maxSize: number; // (optional) (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 20)

const { status, data } = await apiInstance.searchByFilters(
    type,
    city,
    area,
    minRooms,
    maxRooms,
    minBaths,
    maxBaths,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **type** | [**&#39;RENT&#39; | &#39;PURCHASE&#39; | &#39;COMMERCIAL_RENT&#39; | &#39;COMMERCIAL_PURCHASE&#39; | &#39;STUDENT&#39;**]**Array<&#39;RENT&#39; &#124; &#39;PURCHASE&#39; &#124; &#39;COMMERCIAL_RENT&#39; &#124; &#39;COMMERCIAL_PURCHASE&#39; &#124; &#39;STUDENT&#39;>** |  | (optional) defaults to undefined|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **area** | [**string**] |  | (optional) defaults to undefined|
| **minRooms** | [**number**] |  | (optional) defaults to undefined|
| **maxRooms** | [**number**] |  | (optional) defaults to undefined|
| **minBaths** | [**number**] |  | (optional) defaults to undefined|
| **maxBaths** | [**number**] |  | (optional) defaults to undefined|
| **minPrice** | [**number**] |  | (optional) defaults to undefined|
| **maxPrice** | [**number**] |  | (optional) defaults to undefined|
| **minSize** | [**number**] |  | (optional) defaults to undefined|
| **maxSize** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 20|


### Return type

**PageResponsePropertyBriefResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchByText**
> PageResponsePropertyBriefResponse searchByText()


### Example

```typescript
import {
    PropertyControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyControllerApi(configuration);

let text: string; // (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 20)

const { status, data } = await apiInstance.searchByText(
    text,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **text** | [**string**] |  | defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 20|


### Return type

**PageResponsePropertyBriefResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

