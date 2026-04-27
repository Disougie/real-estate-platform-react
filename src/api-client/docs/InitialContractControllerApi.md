# InitialContractControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**acceptContract**](#acceptcontract) | **POST** /api/v1/initial-contracts/{id}/accept | |
|[**createInitialContract**](#createinitialcontract) | **POST** /api/v1/initial-contracts | |
|[**getInitialContract**](#getinitialcontract) | **GET** /api/v1/initial-contracts/{id} | |
|[**getMyInitialContracts**](#getmyinitialcontracts) | **GET** /api/v1/initial-contracts | |
|[**rejectContract**](#rejectcontract) | **POST** /api/v1/initial-contracts/{id}/reject | |

# **acceptContract**
> object acceptContract()


### Example

```typescript
import {
    InitialContractControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InitialContractControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.acceptContract(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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

# **createInitialContract**
> InitialContractCreationResponse createInitialContract(initialContractCreationRequest)


### Example

```typescript
import {
    InitialContractControllerApi,
    Configuration,
    InitialContractCreationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InitialContractControllerApi(configuration);

let initialContractCreationRequest: InitialContractCreationRequest; //

const { status, data } = await apiInstance.createInitialContract(
    initialContractCreationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **initialContractCreationRequest** | **InitialContractCreationRequest**|  | |


### Return type

**InitialContractCreationResponse**

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

# **getInitialContract**
> InitialContractResponse getInitialContract()


### Example

```typescript
import {
    InitialContractControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InitialContractControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getInitialContract(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**InitialContractResponse**

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

# **getMyInitialContracts**
> Array<InitialContractResponse> getMyInitialContracts()


### Example

```typescript
import {
    InitialContractControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InitialContractControllerApi(configuration);

const { status, data } = await apiInstance.getMyInitialContracts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<InitialContractResponse>**

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

# **rejectContract**
> object rejectContract()


### Example

```typescript
import {
    InitialContractControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InitialContractControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.rejectContract(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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

