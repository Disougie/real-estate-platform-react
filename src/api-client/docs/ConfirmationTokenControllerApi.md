# ConfirmationTokenControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**resendToken**](#resendtoken) | **POST** /api/v1/token/resend | |
|[**verifyChangeEmail**](#verifychangeemail) | **GET** /api/v1/token/verify-change | |
|[**verifyToken**](#verifytoken) | **GET** /api/v1/token/verify | |

# **resendToken**
> object resendToken(resendTokenRequest)


### Example

```typescript
import {
    ConfirmationTokenControllerApi,
    Configuration,
    ResendTokenRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ConfirmationTokenControllerApi(configuration);

let resendTokenRequest: ResendTokenRequest; //

const { status, data } = await apiInstance.resendToken(
    resendTokenRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resendTokenRequest** | **ResendTokenRequest**|  | |


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **verifyChangeEmail**
> object verifyChangeEmail()


### Example

```typescript
import {
    ConfirmationTokenControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConfirmationTokenControllerApi(configuration);

let token: string; // (default to undefined)

const { status, data } = await apiInstance.verifyChangeEmail(
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] |  | defaults to undefined|


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **verifyToken**
> object verifyToken()


### Example

```typescript
import {
    ConfirmationTokenControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConfirmationTokenControllerApi(configuration);

let token: string; // (default to undefined)

const { status, data } = await apiInstance.verifyToken(
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] |  | defaults to undefined|


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

