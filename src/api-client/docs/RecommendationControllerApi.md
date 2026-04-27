# RecommendationControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getRecommendations**](#getrecommendations) | **GET** /api/v1/recommendation | |

# **getRecommendations**
> Array<PropertyDetailedResponse> getRecommendations()


### Example

```typescript
import {
    RecommendationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecommendationControllerApi(configuration);

const { status, data } = await apiInstance.getRecommendations();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PropertyDetailedResponse>**

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

