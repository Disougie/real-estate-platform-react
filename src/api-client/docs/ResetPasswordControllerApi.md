# ResetPasswordControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**resetPassword**](#resetpassword) | **POST** /api/v1/reset-password | |

# **resetPassword**
> { [key: string]: string; } resetPassword()


### Example

```typescript
import {
    ResetPasswordControllerApi,
    Configuration,
    ResetPasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ResetPasswordControllerApi(configuration);

let request: ResetPasswordRequest; // (default to undefined)

const { status, data } = await apiInstance.resetPassword(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ResetPasswordRequest** |  | defaults to undefined|


### Return type

**{ [key: string]: string; }**

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

