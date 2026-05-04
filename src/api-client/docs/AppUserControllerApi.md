# AppUserControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**disableAccount**](#disableaccount) | **DELETE** /api/v1/users | |
|[**getUser**](#getuser) | **GET** /api/v1/users/{id} | |

# **disableAccount**
> object disableAccount(disableRequest)


### Example

```typescript
import {
    AppUserControllerApi,
    Configuration,
    DisableRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AppUserControllerApi(configuration);

let disableRequest: DisableRequest; //

const { status, data } = await apiInstance.disableAccount(
    disableRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **disableRequest** | **DisableRequest**|  | |


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

# **getUser**
> AppUserResponse getUser()


### Example

```typescript
import {
    AppUserControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AppUserControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**AppUserResponse**

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

