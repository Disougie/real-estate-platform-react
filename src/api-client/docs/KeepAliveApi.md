# KeepAliveApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**keepServerAlive**](#keepserveralive) | **GET** /keep-alive | |

# **keepServerAlive**
> object keepServerAlive()


### Example

```typescript
import {
    KeepAliveApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new KeepAliveApi(configuration);

const { status, data } = await apiInstance.keepServerAlive();
```

### Parameters
This endpoint does not have any parameters.


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

