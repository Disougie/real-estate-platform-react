# RegistrationControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**register**](#register) | **POST** /api/v1/registration | |

# **register**
> RegistrationResponse register(registrationRequest)


### Example

```typescript
import {
    RegistrationControllerApi,
    Configuration,
    RegistrationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RegistrationControllerApi(configuration);

let registrationRequest: RegistrationRequest; //

const { status, data } = await apiInstance.register(
    registrationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registrationRequest** | **RegistrationRequest**|  | |


### Return type

**RegistrationResponse**

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

