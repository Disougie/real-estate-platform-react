# BlogControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getBolgs**](#getbolgs) | **GET** /api/v1/blogs | |

# **getBolgs**
> Array<BlogUsersReponse> getBolgs()


### Example

```typescript
import {
    BlogControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BlogControllerApi(configuration);

const { status, data } = await apiInstance.getBolgs();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<BlogUsersReponse>**

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

