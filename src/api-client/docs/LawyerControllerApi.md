# LawyerControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**banContract**](#bancontract) | **POST** /api/v1/lawyer/initial-contracts/{id}/ban | |
|[**cancelContract**](#cancelcontract) | **POST** /api/v1/lawyer/initial-contracts/{id}/cancel | |
|[**completeContract**](#completecontract) | **POST** /api/v1/lawyer/initial-contracts/{id}/complete | |
|[**getContract**](#getcontract) | **GET** /api/v1/lawyer/initial-contracts/{id} | |
|[**getMyContracts**](#getmycontracts) | **GET** /api/v1/lawyer/initial-contracts/my-contracts | |
|[**getPendingContracts**](#getpendingcontracts) | **GET** /api/v1/lawyer/initial-contracts | |
|[**workingOnContract**](#workingoncontract) | **POST** /api/v1/lawyer/initial-contracts/{id}/working-on | |

# **banContract**
> object banContract()


### Example

```typescript
import {
    LawyerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LawyerControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.banContract(
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

# **cancelContract**
> object cancelContract()


### Example

```typescript
import {
    LawyerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LawyerControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.cancelContract(
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

# **completeContract**
> object completeContract()


### Example

```typescript
import {
    LawyerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LawyerControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.completeContract(
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

# **getContract**
> InitialContractResponse getContract()


### Example

```typescript
import {
    LawyerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LawyerControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getContract(
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

# **getMyContracts**
> Array<InitialContractResponse> getMyContracts()


### Example

```typescript
import {
    LawyerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LawyerControllerApi(configuration);

const { status, data } = await apiInstance.getMyContracts();
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

# **getPendingContracts**
> Array<InitialContractResponse> getPendingContracts()


### Example

```typescript
import {
    LawyerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LawyerControllerApi(configuration);

const { status, data } = await apiInstance.getPendingContracts();
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

# **workingOnContract**
> object workingOnContract()


### Example

```typescript
import {
    LawyerControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LawyerControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.workingOnContract(
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

