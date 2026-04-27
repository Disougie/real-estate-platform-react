# ChangeInfoControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**changeEmail**](#changeemail) | **POST** /api/v1/change/email | |
|[**changePassword**](#changepassword) | **POST** /api/v1/change/password | |
|[**changePhone**](#changephone) | **POST** /api/v1/change/phone | |

# **changeEmail**
> object changeEmail(changeEmailRequest)


### Example

```typescript
import {
    ChangeInfoControllerApi,
    Configuration,
    ChangeEmailRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ChangeInfoControllerApi(configuration);

let changeEmailRequest: ChangeEmailRequest; //

const { status, data } = await apiInstance.changeEmail(
    changeEmailRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changeEmailRequest** | **ChangeEmailRequest**|  | |


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

# **changePassword**
> object changePassword(changePasswordRequest)


### Example

```typescript
import {
    ChangeInfoControllerApi,
    Configuration,
    ChangePasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ChangeInfoControllerApi(configuration);

let changePasswordRequest: ChangePasswordRequest; //

const { status, data } = await apiInstance.changePassword(
    changePasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changePasswordRequest** | **ChangePasswordRequest**|  | |


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

# **changePhone**
> object changePhone(changePhoneRequest)


### Example

```typescript
import {
    ChangeInfoControllerApi,
    Configuration,
    ChangePhoneRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ChangeInfoControllerApi(configuration);

let changePhoneRequest: ChangePhoneRequest; //

const { status, data } = await apiInstance.changePhone(
    changePhoneRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changePhoneRequest** | **ChangePhoneRequest**|  | |


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

